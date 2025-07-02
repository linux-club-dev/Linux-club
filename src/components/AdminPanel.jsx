"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Users,
  BookOpen,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Github,
  Linkedin,
  MapPin,
  Clock,
  LinkIcon,
  Save,
  Terminal,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const TABS = {
  OVERVIEW: "overview",
  TEAM: "team",
  BLOGS: "blogs",
  EVENTS: "events",
};

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  // Data states
  const [teamMembers, setTeamMembers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);

  // Modal states
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Form states
  const [editingItem, setEditingItem] = useState(null);
  const [teamForm, setTeamForm] = useState({
    name: "",
    title: "",
    img: "",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
  });
  const [blogForm, setBlogForm] = useState({
    title: "",
    link: "",
  });
  const [eventForm, setEventForm] = useState({
    EventName: "",
    EventDescription: "",
    EventDate: "",
    EventTime: "",
    EventVenue: "",
  });

  // API Functions
  const fetchData = useCallback(
    async (endpoint) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/${endpoint}`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch data");
        return data;
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to fetch ${endpoint}: ${error.message}`,
          variant: "destructive",
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const submitData = useCallback(
    async (endpoint, data, method = "POST") => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/admin/${endpoint}${method === "DELETE" ? `?id=${data}` : ""}`,
          {
            method,
            headers:
              method !== "DELETE" ? { "Content-Type": "application/json" } : {},
            body: method !== "DELETE" ? JSON.stringify(data) : undefined,
          }
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Operation failed");
        toast({
          title: "Success",
          description: result.message || "Operation completed successfully",
        });
        return result;
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      const [teamData, blogData, eventData] = await Promise.all([
        fetchData("team"),
        fetchData("blogs"),
        fetchData("events"),
      ]);
      if (teamData) setTeamMembers(teamData.teamMembers || []);
      if (blogData) setBlogs(blogData.blogs || []);
      if (eventData) setEvents(eventData.events || []);
    };

    loadInitialData();
  }, [fetchData]);

  // Refresh data
  const refreshData = useCallback(async () => {
    setRefreshing(true);
    const [teamData, blogData, eventData] = await Promise.all([
      fetchData("team"),
      fetchData("blogs"),
      fetchData("events"),
    ]);
    if (teamData) setTeamMembers(teamData.teamMembers || []);
    if (blogData) setBlogs(blogData.blogs || []);
    if (eventData) setEvents(eventData.events || []);
    setRefreshing(false);
  }, [fetchData]);

  // Form handlers
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const data = editingItem
        ? { ...teamForm, _id: editingItem._id }
        : teamForm;
      await submitData("team", data, method);
      await refreshData();
      setIsTeamModalOpen(false);
      resetTeamForm();
    } catch (error) {
      // Error handling done in submitData
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const data = editingItem
        ? { ...blogForm, _id: editingItem._id }
        : blogForm;
      await submitData("blogs", data, method);
      await refreshData();
      setIsBlogModalOpen(false);
      resetBlogForm();
    } catch (error) {
      // Error handling done in submitData
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const data = editingItem
        ? { ...eventForm, _id: editingItem._id }
        : eventForm;
      await submitData("events", data, method);
      await refreshData();
      setIsEventModalOpen(false);
      resetEventForm();
    } catch (error) {
      // Error handling done in submitData
    }
  };

  // Delete handlers
  const handleDelete = async (type, id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await submitData(type, id, "DELETE");
      await refreshData();
    } catch (error) {
      // Error handling done in submitData
    }
  };

  // Edit handlers
  const handleEdit = (type, item) => {
    setEditingItem(item);
    if (type === "team") {
      setTeamForm(item);
      setIsTeamModalOpen(true);
    } else if (type === "blogs") {
      setBlogForm(item);
      setIsBlogModalOpen(true);
    } else if (type === "events") {
      setEventForm(item);
      setIsEventModalOpen(true);
    }
  };

  // Form reset functions
  const resetTeamForm = () => {
    setTeamForm({
      name: "",
      title: "",
      img: "",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    });
    setEditingItem(null);
  };

  const resetBlogForm = () => {
    setBlogForm({ title: "", link: "" });
    setEditingItem(null);
  };

  const resetEventForm = () => {
    setEventForm({
      EventName: "",
      EventDescription: "",
      EventDate: "",
      EventTime: "",
      EventVenue: "",
    });
    setEditingItem(null);
  };

  // Filtered data based on search
  const filteredTeamMembers = useMemo(
    () =>
      teamMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [teamMembers, searchTerm]
  );

  const filteredBlogs = useMemo(
    () =>
      blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [blogs, searchTerm]
  );

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.EventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.EventVenue.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [events, searchTerm]
  );

  // Stats calculation
  const stats = useMemo(
    () => ({
      totalTeamMembers: teamMembers.length,
      totalBlogs: blogs.length,
      totalEvents: events.length,
      recentItems: [
        ...teamMembers.slice(0, 3).map((m) => ({ ...m, type: "team" })),
        ...blogs.slice(0, 3).map((b) => ({ ...b, type: "blog" })),
        ...events.slice(0, 3).map((e) => ({ ...e, type: "event" })),
      ]
        .sort(
          (a, b) =>
            new Date(b.createdAt || b.joinDate) -
            new Date(a.createdAt || a.joinDate)
        )
        .slice(0, 5),
    }),
    [teamMembers, blogs, events]
  );

  return (
    <div className="min-h-screen font-mono bg-black">
      {/* Terminal-style header bar */}
      <div className="h-1 bg-green-500"></div>

      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Terminal className="w-8 h-8 text-green-500" />
                <div>
                  <h1 className="mb-1 text-4xl font-bold text-green-500">
                    $ linux-club --admin
                  </h1>
                  <p className="text-sm text-green-400">
                    {">"} Managing club resources and members
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={refreshData}
              disabled={refreshing}
              variant="outline"
              className="font-mono text-green-500 bg-black border-green-500 hover:bg-green-500 hover:text-black"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              refresh
            </Button>
          </div>

          {/* Terminal-style search */}
          <div className="relative mb-6">
            <div className="flex items-center p-2 bg-gray-900 border border-green-500 rounded-md">
              <span className="mr-2 text-green-500">$</span>
              <Search className="w-4 h-4 mr-2 text-green-500" />
              <Input
                placeholder="grep -i 'search term' *"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-mono text-green-400 placeholder-green-600 bg-transparent border-none focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Terminal-style tabs */}
          <div className="flex p-1 space-x-1 bg-gray-900 border border-green-500 rounded-md">
            {Object.entries(TABS).map(([key, value]) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`px-4 py-2 rounded-sm text-sm font-mono transition-all duration-200 ${
                  activeTab === value
                    ? "bg-green-500 text-black font-bold"
                    : "text-green-400 hover:text-green-300 hover:bg-gray-800"
                }`}
              >
                ./{key.toLowerCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === TABS.OVERVIEW && (
              <OverviewTab stats={stats} loading={loading} />
            )}
            {activeTab === TABS.TEAM && (
              <TeamTab
                members={filteredTeamMembers}
                onEdit={(item) => handleEdit("team", item)}
                onDelete={(id) => handleDelete("team", id)}
                onAdd={() => setIsTeamModalOpen(true)}
                loading={loading}
              />
            )}
            {activeTab === TABS.BLOGS && (
              <BlogsTab
                blogs={filteredBlogs}
                onEdit={(item) => handleEdit("blogs", item)}
                onDelete={(id) => handleDelete("blogs", id)}
                onAdd={() => setIsBlogModalOpen(true)}
                loading={loading}
              />
            )}
            {activeTab === TABS.EVENTS && (
              <EventsTab
                events={filteredEvents}
                onEdit={(item) => handleEdit("events", item)}
                onDelete={(id) => handleDelete("events", id)}
                onAdd={() => setIsEventModalOpen(true)}
                loading={loading}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Modals */}
        <TeamModal
          isOpen={isTeamModalOpen}
          onClose={() => {
            setIsTeamModalOpen(false);
            resetTeamForm();
          }}
          onSubmit={handleTeamSubmit}
          form={teamForm}
          setForm={setTeamForm}
          isEditing={!!editingItem}
          loading={loading}
        />
        <BlogModal
          isOpen={isBlogModalOpen}
          onClose={() => {
            setIsBlogModalOpen(false);
            resetBlogForm();
          }}
          onSubmit={handleBlogSubmit}
          form={blogForm}
          setForm={setBlogForm}
          isEditing={!!editingItem}
          loading={loading}
        />
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            resetEventForm();
          }}
          onSubmit={handleEventSubmit}
          form={eventForm}
          setForm={setEventForm}
          isEditing={!!editingItem}
          loading={loading}
        />
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ stats, loading }) => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="./team"
        value={stats.totalTeamMembers}
        icon={Users}
        color="green"
        loading={loading}
      />
      <StatsCard
        title="./blogs"
        value={stats.totalBlogs}
        icon={BookOpen}
        color="green"
        loading={loading}
      />
      <StatsCard
        title="./events"
        value={stats.totalEvents}
        icon={Calendar}
        color="green"
        loading={loading}
      />
      <StatsCard
        title="./total"
        value={stats.totalTeamMembers + stats.totalBlogs + stats.totalEvents}
        icon={Server}
        color="green"
        loading={loading}
      />
    </div>

    {/* Recent Activity */}
    <Card className="p-6 bg-gray-900 border-green-500">
      <div className="flex items-center mb-4">
        <Terminal className="w-5 h-5 mr-2 text-green-500" />
        <h3 className="font-mono text-xl text-green-500">
          $ tail -f activity.log
        </h3>
      </div>
      <div className="space-y-3">
        {stats.recentItems.map((item, index) => (
          <div
            key={`${item.type}-${item._id || index}`}
            className="flex items-center p-3 space-x-3 font-mono bg-black border border-green-800 rounded-md"
          >
            <div className="text-xs text-green-500">
              [{new Date().toLocaleTimeString()}]
            </div>
            <div
              className={`w-2 h-2 rounded-full ${
                item.type === "team"
                  ? "bg-green-500"
                  : item.type === "blog"
                  ? "bg-green-400"
                  : "bg-green-300"
              }`}
            />
            <div className="flex-1">
              <p className="font-medium text-green-400">
                {item.name || item.title || item.EventName}
              </p>
              <p className="text-sm text-green-600">
                {item.type === "team"
                  ? item.title
                  : item.type === "blog"
                  ? "Blog Post"
                  : `Event • ${item.EventVenue}`}
              </p>
            </div>
            <Badge
              variant="outline"
              className="font-mono text-green-400 border-green-600"
            >
              {item.type}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color, loading }) => (
  <Card className="p-6 bg-gray-900 border-green-500">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-mono text-sm font-medium text-green-600">{title}</p>
        <p className="font-mono text-2xl font-bold text-green-500">
          {loading ? "..." : value}
        </p>
      </div>
      <div className="p-3 border rounded-md bg-green-500/20 border-green-500/30">
        <Icon className="w-6 h-6 text-green-500" />
      </div>
    </div>
  </Card>
);

// Team Tab Component
const TeamTab = ({ members, onEdit, onDelete, onAdd, loading }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Terminal className="w-5 h-5 text-green-500" />
        <h2 className="font-mono text-2xl font-bold text-green-500">
          $ ls -la ./team/
        </h2>
      </div>
      <Button
        onClick={onAdd}
        className="font-mono text-black bg-green-500 hover:bg-green-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        add_member
      </Button>
    </div>

    {loading ? (
      <div className="py-8 text-center">
        <div className="w-8 h-8 mx-auto border-b-2 border-green-500 rounded-full animate-spin"></div>
        <p className="mt-2 font-mono text-green-400">Loading...</p>
      </div>
    ) : (
      <Card className="bg-gray-900 border-green-500">
        <Table>
          <TableHeader>
            <TableRow className="border-green-800">
              <TableHead className="font-mono text-green-400">Member</TableHead>
              <TableHead className="font-mono text-green-400">Role</TableHead>
              <TableHead className="font-mono text-green-400">Links</TableHead>
              <TableHead className="font-mono text-green-400">Joined</TableHead>
              <TableHead className="font-mono text-green-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member._id} className="border-green-800">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 overflow-hidden border border-green-500 rounded-full">
                      <Image
                        src={getValidImageUrl(member.img, member.name)}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`;
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-mono font-medium text-green-400">
                        {member.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-green-300">
                  {member.title}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-400"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-400"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-green-300">
                  {new Date(member.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(member)}
                      className="font-mono text-green-400 border-green-600 hover:bg-green-500 hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(member._id)}
                      className="font-mono text-red-400 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )}
  </div>
);

// Blog Tab Component
const BlogsTab = ({ blogs, onEdit, onDelete, onAdd, loading }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Terminal className="w-5 h-5 text-green-500" />
        <h2 className="font-mono text-2xl font-bold text-green-500">
          $ ls -la ./blogs/
        </h2>
      </div>
      <Button
        onClick={onAdd}
        className="font-mono text-black bg-green-500 hover:bg-green-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        add_blog
      </Button>
    </div>

    {loading ? (
      <div className="py-8 text-center">
        <div className="w-8 h-8 mx-auto border-b-2 border-green-500 rounded-full animate-spin"></div>
        <p className="mt-2 font-mono text-green-400">Loading...</p>
      </div>
    ) : (
      <Card className="bg-gray-900 border-green-500">
        <Table>
          <TableHeader>
            <TableRow className="border-green-800">
              <TableHead className="font-mono text-green-400">Title</TableHead>
              <TableHead className="font-mono text-green-400">Link</TableHead>
              <TableHead className="font-mono text-green-400">
                Created
              </TableHead>
              <TableHead className="font-mono text-green-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id} className="border-green-800">
                <TableCell className="font-mono font-medium text-green-400">
                  {blog.title}
                </TableCell>
                <TableCell>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center font-mono text-green-500 hover:text-green-300"
                  >
                    <LinkIcon className="w-4 h-4 mr-1" />
                    view
                  </a>
                </TableCell>
                <TableCell className="font-mono text-green-300">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(blog)}
                      className="font-mono text-green-400 border-green-600 hover:bg-green-500 hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(blog._id)}
                      className="font-mono text-red-400 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )}
  </div>
);

// Events Tab Component
const EventsTab = ({ events, onEdit, onDelete, onAdd, loading }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Terminal className="w-5 h-5 text-green-500" />
        <h2 className="font-mono text-2xl font-bold text-green-500">
          $ ls -la ./events/
        </h2>
      </div>
      <Button
        onClick={onAdd}
        className="font-mono text-black bg-green-500 hover:bg-green-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        add_event
      </Button>
    </div>

    {loading ? (
      <div className="py-8 text-center">
        <div className="w-8 h-8 mx-auto border-b-2 border-green-500 rounded-full animate-spin"></div>
        <p className="mt-2 font-mono text-green-400">Loading...</p>
      </div>
    ) : (
      <Card className="bg-gray-900 border-green-500">
        <Table>
          <TableHeader>
            <TableRow className="border-green-800">
              <TableHead className="font-mono text-green-400">
                Event Name
              </TableHead>
              <TableHead className="font-mono text-green-400">
                Date & Time
              </TableHead>
              <TableHead className="font-mono text-green-400">Venue</TableHead>
              <TableHead className="font-mono text-green-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id} className="border-green-800">
                <TableCell>
                  <div>
                    <p className="font-mono font-medium text-green-400">
                      {event.EventName}
                    </p>
                    <p className="font-mono text-sm text-green-600">
                      {event.EventDescription}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-mono text-green-300">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.EventDate}
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.EventTime}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="flex items-center font-mono text-green-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.EventVenue}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(event)}
                      className="font-mono text-green-400 border-green-600 hover:bg-green-500 hover:text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(event._id)}
                      className="font-mono text-red-400 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )}
  </div>
);

// Team Modal Component
const TeamModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  isEditing,
  loading,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="font-mono text-green-400 bg-black border-green-500">
      <DialogHeader>
        <DialogTitle className="font-mono text-green-500">
          $ {isEditing ? "edit" : "add"}_member.sh
        </DialogTitle>
        <DialogDescription className="font-mono text-green-600">
          {">"} {isEditing ? "Update" : "Add"} team member information
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --name
          </label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="Enter member name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --title
          </label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="Enter member title"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --img
          </label>
          <Input
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --github
          </label>
          <Input
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="GitHub profile URL"
          />
        </div>
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --linkedin
          </label>
          <Input
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="LinkedIn profile URL"
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="font-mono text-green-400 bg-transparent border-green-600 hover:bg-green-500 hover:text-black"
          >
            cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="font-mono text-black bg-green-500 hover:bg-green-600"
          >
            {loading ? (
              <div className="w-4 h-4 mr-2 border-b-2 border-black rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "update" : "create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
);

// Blog Modal Component
const BlogModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  isEditing,
  loading,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="font-mono text-green-400 bg-black border-green-500">
      <DialogHeader>
        <DialogTitle className="font-mono text-green-500">
          $ {isEditing ? "edit" : "add"}_blog.sh
        </DialogTitle>
        <DialogDescription className="font-mono text-green-600">
          {">"} {isEditing ? "Update" : "Add"} blog post information
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --title
          </label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --link
          </label>
          <Input
            type="url"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="Enter blog URL"
            required
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="font-mono text-green-400 bg-transparent border-green-600 hover:bg-green-500 hover:text-black"
          >
            cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="font-mono text-black bg-green-500 hover:bg-green-600"
          >
            {loading ? (
              <div className="w-4 h-4 mr-2 border-b-2 border-black rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "update" : "create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
);

// Event Modal Component
const EventModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  isEditing,
  loading,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-2xl font-mono text-green-400 bg-black border-green-500">
      <DialogHeader>
        <DialogTitle className="font-mono text-green-500">
          $ {isEditing ? "edit" : "add"}_event.sh
        </DialogTitle>
        <DialogDescription className="font-mono text-green-600">
          {">"} {isEditing ? "Update" : "Add"} event information
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --name
          </label>
          <Input
            value={form.EventName}
            onChange={(e) => setForm({ ...form, EventName: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="Enter event name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --description
          </label>
          <textarea
            value={form.EventDescription}
            onChange={(e) =>
              setForm({ ...form, EventDescription: e.target.value })
            }
            className="w-full h-24 px-3 py-2 font-mono text-green-400 placeholder-green-600 bg-gray-900 border border-green-500 rounded-md resize-none"
            placeholder="Enter event description"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-mono text-sm font-medium text-green-400">
              --date
            </label>
            <Input
              value={form.EventDate}
              onChange={(e) => setForm({ ...form, EventDate: e.target.value })}
              className="font-mono text-green-400 bg-gray-900 border-green-500"
              placeholder="Enter event date"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-mono text-sm font-medium text-green-400">
              --time
            </label>
            <Input
              value={form.EventTime}
              onChange={(e) => setForm({ ...form, EventTime: e.target.value })}
              className="font-mono text-green-400 bg-gray-900 border-green-500"
              placeholder="Enter event time"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-mono text-sm font-medium text-green-400">
            --venue
          </label>
          <Input
            value={form.EventVenue}
            onChange={(e) => setForm({ ...form, EventVenue: e.target.value })}
            className="font-mono text-green-400 bg-gray-900 border-green-500"
            placeholder="Enter event venue"
            required
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="font-mono text-green-400 bg-transparent border-green-600 hover:bg-green-500 hover:text-black"
          >
            cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="font-mono text-black bg-green-500 hover:bg-green-600"
          >
            {loading ? (
              <div className="w-4 h-4 mr-2 border-b-2 border-black rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "update" : "create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
);

export default AdminPanel;

// Utility function to get a valid image URL
const getValidImageUrl = (imageUrl, fallbackSeed) => {
  if (!imageUrl)
    return `https://api.dicebear.com/7.x/initials/svg?seed=${fallbackSeed}`;

  // Check if it's a valid absolute URL
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Check if it's a valid relative path (starts with /)
  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  // Invalid path, use fallback
  return `https://api.dicebear.com/7.x/initials/svg?seed=${fallbackSeed}`;
};
