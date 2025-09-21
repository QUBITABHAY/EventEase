import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CardSwap from '../components/CardSwap';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      
      

          <CardSwap />
        </div>

    
  );
};

export default Home;