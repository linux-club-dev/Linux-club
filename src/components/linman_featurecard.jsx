import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const FeatureCard = ({ icon, title, description }) => (
  <Card className="bg-black/50 border-green-500/50 hover:border-green-500 transition-colors duration-300">
    <CardHeader>
      <div className="flex items-center space-x-2">
        {icon}
        <h3 className="text-xl font-semibold text-green-400">{title}</h3>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-green-300">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
