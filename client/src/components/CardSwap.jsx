import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export const Card = forwardRef(({ customClass, image, imageAlt, title, description, children, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black text-white font-bold overflow-hidden [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}>
    {image && (
      <div className="w-full h-2/3 bg-gray-800 rounded-t-lg overflow-hidden">
        <img 
          src={image} 
          alt={imageAlt || 'Card image'} 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Failed to load image:', image);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', image);
          }}
        />
      </div>
    )}
    <div className="p-4 h-1/3 flex flex-col justify-center">
      {title && <h3 className="text-lg font-bold mb-2 truncate">{title}</h3>}
      {description && <p className="text-sm opacity-90 line-clamp-2">{description}</p>}
      {children}
    </div>
  </div>
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  
  // Default event cards if no children provided
  const defaultCards = [
    <Card 
      key={0}
      image="/event1.jpg"
      imageAlt="Tech Conference 2025"
      title="Tech Conference 2025"
      description="Join industry leaders for cutting-edge technology discussions and networking opportunities."
    />,
    <Card 
      key={1}
      image="/event2.jpg"
      imageAlt="Innovation Summit"
      title="Innovation Summit"
      description="Discover breakthrough innovations and connect with entrepreneurs shaping the future."
    />,
    <Card 
      key={2}
      image="/event3.jpg"
      imageAlt="Developer Workshop"
      title="Developer Workshop"
      description="Hands-on coding sessions and best practices from experienced software engineers."
    />
  ];

  const cardsToRender = children ? childArr : defaultCards;
  const refs = useMemo(
    () => cardsToRender.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardsToRender.length]
  );

  const order = useRef(Array.from({ length: cardsToRender.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach(
      (r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        }, `promote+=${i * 0.15}`);
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, undefined, 'return');
      tl.to(elFront, {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      }, 'return');

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = cardsToRender.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child);

  return (
    <div
      ref={container}
      className="absolute top-30 right-8 perspective-[900px] overflow-visible z-10"
      style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
