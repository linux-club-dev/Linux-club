"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Cpu,
  Command,
  ArrowRight,
  BookOpen,
  Code,
  Coffee,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";

const commands = [
  { name: "ls", fullForm: "List", usage: "List directory contents" },
  {
    name: "cd",
    fullForm: "Change Directory",
    usage: "Change the current directory",
  },
  {
    name: "pwd",
    fullForm: "Print Working Directory",
    usage: "Display current working directory",
  },
  {
    name: "mkdir",
    fullForm: "Make Directory",
    usage: "Create a new directory",
  },
  { name: "rm", fullForm: "Remove", usage: "Remove files or directories" },
  { name: "cp", fullForm: "Copy", usage: "Copy files and directories" },
  {
    name: "mv",
    fullForm: "Move",
    usage: "Move or rename files and directories",
  },
  {
    name: "touch",
    fullForm: "Touch",
    usage: "Create an empty file or update file timestamps",
  },
  { name: "cat", fullForm: "Concatenate", usage: "Display file contents" },
  {
    name: "grep",
    fullForm: "Global Regular Expression Print",
    usage: "Search for patterns in files",
  },
  { name: "chmod", fullForm: "Change Mode", usage: "Change file permissions" },
  {
    name: "chown",
    fullForm: "Change Owner",
    usage: "Change file owner and group",
  },
  {
    name: "sudo",
    fullForm: "Superuser Do",
    usage: "Execute a command as a superuser",
  },
  {
    name: "apt",
    fullForm: "Advanced Package Tool",
    usage: "Package management utility",
  },
  { name: "man", fullForm: "Manual", usage: "Display system manual pages" },
];

const TuxMascot = () => (
  <motion.div
    className="fixed w-16 h-16 bottom-4 right-4"
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="45" fill="#000000" />
      <circle cx="35" cy="40" r="5" fill="#FFFFFF" />
      <circle cx="65" cy="40" r="5" fill="#FFFFFF" />
      <ellipse cx="50" cy="65" rx="15" ry="10" fill="#FF6B6B" />
      <path
        d="M 40 80 Q 50 90 60 80"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
    </svg>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <Card className="transition-colors duration-300 bg-black/50 border-green-500/50 hover:border-green-500">
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

const CommandCard = ({ cmd }) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsLoading(false),
      Math.random() * 1000 + 500
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
    <Card className="transition-colors duration-300 bg-black/50 border-green-500/50 hover:border-green-500">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-semibold text-green-400">{cmd.name}</h3>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="icon"
          className="text-green-500 hover:text-green-400 hover:bg-green-900/50"
        >
          {isCopied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
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
    <Card className="mt-4 bg-black/50 border-green-500/50">
      <CardContent className="p-4">
        <div className="h-40 mb-2 overflow-y-auto font-mono text-sm text-green-400">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <form onSubmit={handleCommand} className="flex">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-green-400 bg-black/50 border-green-500/50"
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

export default function Manpage() {
  return (
    <div className="min-h-screen p-6 text-center text-green-300 bg-gradient-to-b from-black to-green-900/30 ">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-4xl font-bold text-green-400"
      >
        Linux Manual
      </motion.h1>

      <Tabs defaultValue="intro" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 2">
          <TabsTrigger
            value="intro"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-black"
          >
            <Cpu className="w-5 h-5 mr-2" />
            Intro
          </TabsTrigger>
          <TabsTrigger
            value="terminal"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-black"
          >
            <Terminal className="w-5 h-5 mr-2" />
            Terminal
          </TabsTrigger>
          <TabsTrigger
            value="commands"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-black"
          >
            <Command className="w-5 h-5 mr-2" />
            Commands
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intro">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-semibold text-green-400">
                Welcome to the World of Linux!
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-green-300">
                Discover the power, flexibility, and freedom of the open-source
                operating system that runs the world&apos;s technology.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
              <FeatureCard
                icon={<BookOpen className="w-12 h-12 text-green-500" />}
                title="Open Source"
                description="Linux is free and open-source, allowing anyone to view, modify, and distribute the source code."
              />
              <FeatureCard
                icon={<Code className="w-12 h-12 text-green-500" />}
                title="Customizable"
                description="Tailor your system to your needs with a wide variety of distributions and desktop environments."
              />
              <FeatureCard
                icon={<Coffee className="w-12 h-12 text-green-500" />}
                title="Community-Driven"
                description="Join a vast community of developers, enthusiasts, and users who contribute to and support Linux."
              />
            </div>

            <Card className="mt-8 bg-green-900/50 border-green-500/50">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-green-300">
                  Did You Know?
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-200 list-disc list-inside">
                  <li>
                    Linux powers 96.3% of the world&apos;s top 1 million
                    servers.
                  </li>
                  <li>
                    Android, which runs on Linux, is the most popular mobile
                    operating system.
                  </li>
                  <li>
                    The Linux kernel has over 27.8 million lines of code, with
                    contributions from thousands of developers.
                  </li>
                  <li>
                    Linux is used in everything from smartphones to
                    supercomputers, including the International Space Station!
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="terminal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="mb-4 text-3xl font-semibold text-green-400">
              Master the Terminal
            </h2>
            <p className="text-xl text-green-300">
              The terminal is your gateway to unleashing the full power of
              Linux. Learn to navigate, manipulate files, and control your
              system with text-based commands.
            </p>

            <InteractiveTerminal />

            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <Card className="bg-black/50 border-green-500/50">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-green-400">
                    Terminal Basics
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-green-300 list-disc list-inside">
                    <li>Commands are case-sensitive</li>
                    <li>Use Tab for auto-completion</li>
                    <li>Ctrl+C interrupts a running command</li>
                    <li>Use man [command] for help on any command</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-black/50 border-green-500/50">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-green-400">
                    Popular Terminal Tools
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-green-300 list-disc list-inside">
                    <li>nano or vim for text editing</li>
                    <li>top or htop for system monitoring</li>
                    <li>wget for downloading files</li>
                    <li>ssh for secure remote access</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-green-900/50 border-green-500/50">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-green-300">
                  Pro Tip
                </h3>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-green-200">
                  Create aliases for your most-used commands to save time. Add
                  them to your ~/.bashrc file:
                </p>
                <pre className="p-2 text-green-400 border rounded bg-black/50 border-green-500/50">
                  alias update=&apos;sudo apt update && sudo apt upgrade&apos;
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="commands">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-green-400">
              Essential Linux Commands
            </h2>
            <p className="mb-6 text-green-300">
              Master these commands to navigate and control your Linux system
              efficiently.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {commands.map((cmd) => (
                <CommandCard key={cmd.name} cmd={cmd} />
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 text-center"
      >
        <Button variant="link" className="text-green-500 hover:text-green-400">
          Explore more Linux resources
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>

      <TuxMascot />
    </div>
  );
}
