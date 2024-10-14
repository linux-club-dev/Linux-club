"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

const CommandCard = ({ cmd }) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsLoading(false),
      Math.random() * 1000 + 500,
    );
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cmd.name);
    setIsCopied(true);
    toast({
      title: "Copied!",
      description: `Command "${cmd.name}" copied to clipboard.`,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <Card className="bg-black/50 border-green-500/50 h-[150px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Terminal className="w-8 h-8 text-green-500" />
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="bg-black/50 border-green-500/50 hover:border-green-500 transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-semibold text-green-400">{cmd.name}</h3>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="icon"
          className="text-green-500 hover:text-green-400 hover:bg-green-900/50"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-green-300">
          <strong>Full form:</strong> {cmd.fullForm}
        </p>
        <p className="text-sm text-green-300">
          <strong>Usage:</strong> {cmd.usage}
        </p>
      </CardContent>
    </Card>
  );
};

export default CommandCard;
