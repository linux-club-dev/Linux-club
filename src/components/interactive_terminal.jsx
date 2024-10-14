"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InteractiveTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  const handleCommand = (e) => {
    e.preventDefault();
    let response = `Command not found: ${input}`;

    if (input === "hello") {
      response = "Hello, Linux enthusiast!";
    } else if (input === "date") {
      response = new Date().toLocaleString();
    } else if (input === "fortune") {
      const fortunes = [
        "You will master the command line soon!",
        "Your next commit will be bug-free.",
        "A great open-source contribution is in your future.",
      ];
      response = fortunes[Math.floor(Math.random() * fortunes.length)];
    } else if (input === "tux") {
      response = "🐧 You found me! I'm Tux, the Linux mascot!";
    }

    setOutput([...output, `$ ${input}`, response]);
    setInput("");
  };

  return (
    <Card className="bg-black/50 border-green-500/50 mt-4">
      <CardContent className="p-4">
        <div className="font-mono text-green-400 text-sm h-40 overflow-y-auto mb-2">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <form onSubmit={handleCommand} className="flex">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-black/50 text-green-400 border-green-500/50"
            placeholder="Type a command..."
          />
          <Button type="submit" className="ml-2">
            Run
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InteractiveTerminal;
