import React from 'react';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to EventEase</h1>
    </div>
  );
};

export default Home;