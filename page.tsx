"use client"

import { useState } from "react"
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Globe,
  Mail,
  MessageSquare,
  History,
  Settings,
  Menu,
  CreditCard,
  Sun,
  Moon,
  Download,
  Chrome,
  FileBox as Firefox,
  Award as Safari,
  Activity,
  Flag,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Added Select components for location selection

export default function ScamDetectorApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [scanInput, setScanInput] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["English"])
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [selectedLocation, setSelectedLocation] = useState("us")
  const [autoReporting, setAutoReporting] = useState(true)
  const [reportContent, setReportContent] = useState("")
  const [sensitivityLevel, setSensitivityLevel] = useState(75)

  const languageOptions = [
    { id: "english", label: "English", flag: "🇺🇸" },
    { id: "spanish", label: "Spanish", flag: "🇪🇸" },
    { id: "french", label: "French", flag: "🇫🇷" },
    { id: "chinese", label: "Chinese", flag: "🇨🇳" },
    { id: "portuguese", label: "Portuguese", flag: "🇵🇹" },
    { id: "korean", label: "Korean", flag: "🇰🇷" },
    { id: "hindi", label: "Hindi", flag: "🇮🇳" },
    { id: "japanese", label: "Japanese", flag: "🇯🇵" },
  ]

  const locationOptions = [
    { id: "us", label: "United States", flag: "🇺🇸", authorities: ["FBI IC3", "FTC", "State Attorney General"] },
    { id: "uk", label: "United Kingdom", flag: "🇬🇧", authorities: ["Action Fraud", "National Cyber Security Centre"] },
    { id: "ca", label: "Canada", flag: "🇨🇦", authorities: ["CAFC", "Competition Bureau"] },
    { id: "au", label: "Australia", flag: "🇦🇺", authorities: ["ACCC Scamwatch", "Australian Cyber Security Centre"] },
    { id: "de", label: "Germany", flag: "🇩🇪", authorities: ["BKA", "Verbraucherzentrale"] },
    { id: "fr", label: "France", flag: "🇫🇷", authorities: ["PHAROS", "DGCCRF"] },
    { id: "jp", label: "Japan", flag: "🇯🇵", authorities: ["National Police Agency", "Consumer Affairs Agency"] },
    { id: "in", label: "India", flag: "🇮🇳", authorities: ["Cyber Crime Portal", "National Consumer Helpline"] },
  ]

  const handleLanguageChange = (languageId: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages((prev) => [...prev, languageId])
    } else {
      setSelectedLanguages((prev) => prev.filter((id) => id !== languageId))
    }
  }

  const handleScan = async () => {
    setIsScanning(true)
    // Simulate scanning process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsScanning(false)
  }

  const handleManualReport = async () => {
    // Simulate report submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setReportContent("")
    // Show success message or update UI
  }

  const recentScans = [
    { id: 1, type: "URL", content: "https://suspicious-site.com", threat: "high", time: "2 min ago" },
    { id: 2, type: "Email", content: "Urgent: Verify your account...", threat: "medium", time: "5 min ago" },
    { id: 3, type: "URL", content: "https://legitimate-bank.com", threat: "safe", time: "10 min ago" },
    { id: 4, type: "Message", content: "You won $1,000,000! Click here...", threat: "high", time: "15 min ago" },
  ]

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-500 text-white"
      case "safe":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getThreatIcon = (threat: string) => {
    switch (threat) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "safe":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const selectedLocationData = locationOptions.find((loc) => loc.id === selectedLocation)

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-background text-foreground"}`}>
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-sidebar border-sidebar-border"} border-r flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg flex-shrink-0">
              <img src="/scam-detective-logo.png" alt="Scam Detective Logo" className="h-8 w-8 object-contain" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-sidebar-foreground"}`}>
                  Scam Detective
                </h1>
                <p className="text-sm text-muted-foreground">Advanced Protection</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "scan", label: "New Scan", icon: Search },
            { id: "history", label: "History", icon: History },
            { id: "extension", label: "Web Extension", icon: Globe },
            { id: "reporting", label: "Reporting", icon: Flag }, // Added reporting tab
            { id: "subscription", label: "Subscription", icon: CreditCard },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${!sidebarOpen && "px-2"}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5" />
              {sidebarOpen && item.label}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full">
            <Menu className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-balance">Security Dashboard</h2>
                <p className="text-muted-foreground text-pretty">
                  Monitor threats and analyze suspicious content in real-time
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">89</div>
                    <p className="text-xs text-muted-foreground">-5% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Safe Content</CardTitle>
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">1,158</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
                    <Shield className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">99.2%</div>
                    <Progress value={99.2} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Scans */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Scans</CardTitle>
                  <CardDescription>Latest threat analysis results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentScans.map((scan) => (
                      <div
                        key={scan.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            {scan.type === "URL" && <Globe className="h-4 w-4" />}
                            {scan.type === "Email" && <Mail className="h-4 w-4" />}
                            {scan.type === "Message" && <MessageSquare className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{scan.type}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-md">{scan.content}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getThreatColor(scan.threat)}>
                            {getThreatIcon(scan.threat)}
                            <span className="ml-1 capitalize">{scan.threat}</span>
                          </Badge>
                          <span className="text-sm text-muted-foreground">{scan.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "scan" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-balance">New Threat Scan</h2>
                <p className="text-muted-foreground text-pretty">
                  Analyze URLs, emails, and messages for potential scams
                </p>
              </div>

              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle>Content Analysis</CardTitle>
                  <CardDescription>Enter the content you want to analyze for potential threats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="url" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="url" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        URL
                      </TabsTrigger>
                      <TabsTrigger value="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </TabsTrigger>
                      <TabsTrigger value="message" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="url" className="space-y-4">
                      <Input
                        placeholder="Enter URL to analyze (e.g., https://suspicious-site.com)"
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                      />
                    </TabsContent>

                    <TabsContent value="email" className="space-y-4">
                      <Textarea
                        placeholder="Paste email content here..."
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        rows={6}
                      />
                    </TabsContent>

                    <TabsContent value="message" className="space-y-4">
                      <Textarea
                        placeholder="Paste message content here..."
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        rows={4}
                      />
                    </TabsContent>
                  </Tabs>

                  <Button onClick={handleScan} disabled={!scanInput.trim() || isScanning} className="w-full" size="lg">
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Scan for Threats
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-balance">Scan History</h2>
                <p className="text-muted-foreground text-pretty">Review all previous threat analysis results</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Scans</CardTitle>
                  <CardDescription>Complete history of your threat detection scans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentScans
                      .concat([
                        {
                          id: 5,
                          type: "URL",
                          content: "https://phishing-attempt.net",
                          threat: "high",
                          time: "1 hour ago",
                        },
                        {
                          id: 6,
                          type: "Email",
                          content: "Your package is ready for delivery...",
                          threat: "medium",
                          time: "2 hours ago",
                        },
                        { id: 7, type: "URL", content: "https://google.com", threat: "safe", time: "3 hours ago" },
                      ])
                      .map((scan) => (
                        <div
                          key={scan.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              {scan.type === "URL" && <Globe className="h-4 w-4" />}
                              {scan.type === "Email" && <Mail className="h-4 w-4" />}
                              {scan.type === "Message" && <MessageSquare className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="font-medium">{scan.type}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-md">{scan.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getThreatColor(scan.threat)}>
                              {getThreatIcon(scan.threat)}
                              <span className="ml-1 capitalize">{scan.threat}</span>
                            </Badge>
                            <span className="text-sm text-muted-foreground">{scan.time}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "extension" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-balance">Web Extension</h2>
                <p className="text-muted-foreground text-pretty">
                  Install our browser extension for passive scam detection across all websites
                </p>
              </div>

              <div className="grid gap-6 max-w-4xl">
                {/* Extension Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Extension Status
                    </CardTitle>
                    <CardDescription>Current protection status across your browsers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Real-time Protection</p>
                          <p className="text-sm text-muted-foreground">Actively monitoring web activity</p>
                        </div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-primary">47</p>
                        <p className="text-sm text-muted-foreground">Threats Blocked Today</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">1,234</p>
                        <p className="text-sm text-muted-foreground">Sites Scanned</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">99.8%</p>
                        <p className="text-sm text-muted-foreground">Uptime</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Browser Extensions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Browser Extensions</CardTitle>
                    <CardDescription>Download and install ScamDetective for your preferred browsers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Chrome Extension */}
                      <div className="border border-border rounded-lg p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Chrome className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Chrome Extension</h3>
                            <p className="text-sm text-muted-foreground">For Google Chrome & Chromium browsers</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-primary text-primary-foreground">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Installed
                          </Badge>
                          <span className="text-sm text-muted-foreground">v2.1.4</span>
                        </div>
                        <Button className="w-full" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Installed
                        </Button>
                      </div>

                      {/* Firefox Extension */}
                      <div className="border border-border rounded-lg p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Firefox className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Firefox Extension</h3>
                            <p className="text-sm text-muted-foreground">For Mozilla Firefox browser</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Available</Badge>
                          <span className="text-sm text-muted-foreground">v2.1.4</span>
                        </div>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Install Extension
                        </Button>
                      </div>

                      {/* Safari Extension */}
                      <div className="border border-border rounded-lg p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Safari className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Safari Extension</h3>
                            <p className="text-sm text-muted-foreground">For Apple Safari browser</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Available</Badge>
                          <span className="text-sm text-muted-foreground">v2.1.4</span>
                        </div>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Install Extension
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Extension Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Extension Settings</CardTitle>
                    <CardDescription>Configure how the extension behaves during passive scanning</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-block High Threats</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically block access to high-risk websites
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Threat Warnings</p>
                        <p className="text-sm text-muted-foreground">Display warning popups for suspicious content</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Scan Social Media</p>
                        <p className="text-sm text-muted-foreground">Analyze posts and messages on social platforms</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Protection</p>
                        <p className="text-sm text-muted-foreground">Scan emails in web-based email clients</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Extension Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Extension Activity</CardTitle>
                    <CardDescription>Latest threats detected by the browser extension</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          site: "suspicious-banking.com",
                          threat: "high",
                          action: "Blocked",
                          time: "5 min ago",
                        },
                        {
                          id: 2,
                          site: "facebook.com",
                          threat: "medium",
                          action: "Warning shown",
                          time: "12 min ago",
                        },
                        {
                          id: 3,
                          site: "phishing-email.net",
                          threat: "high",
                          action: "Blocked",
                          time: "25 min ago",
                        },
                        {
                          id: 4,
                          site: "legitimate-store.com",
                          threat: "safe",
                          action: "Allowed",
                          time: "1 hour ago",
                        },
                      ].map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <Globe className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{activity.site}</p>
                              <p className="text-sm text-muted-foreground">{activity.action}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getThreatColor(activity.threat)}>
                              {getThreatIcon(activity.threat)}
                              <span className="ml-1 capitalize">{activity.threat}</span>
                            </Badge>
                            <span className="text-sm text-muted-foreground">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-balance">Subscription</h2>
                <p className="text-muted-foreground text-pretty">Manage your subscription and billing preferences</p>
              </div>

              <div className="grid gap-6 max-w-4xl">
                {/* Current Subscription Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Current Plan
                    </CardTitle>
                    <CardDescription>Your active subscription details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Advanced Plan</h3>
                        <p className="text-sm text-muted-foreground">Advanced threat detection with priority support</p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">Active</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">1,247</p>
                        <p className="text-sm text-muted-foreground">Scans Used</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">∞</p>
                        <p className="text-sm text-muted-foreground">Monthly Limit</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">Dec 26</p>
                        <p className="text-sm text-muted-foreground">Next Billing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Available Plans */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                    <CardDescription>Choose the plan that best fits your needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Basic Plan */}
                      <div className="border border-border rounded-lg p-6 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Basic</h3>
                          <p className="text-sm text-muted-foreground">Essential protection for personal use</p>
                        </div>
                        <div className="text-3xl font-bold">Free</div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            100 scans per month
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Basic threat detection
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Email support
                          </li>
                        </ul>
                        <Button variant="outline" className="w-full bg-transparent">
                          Current Plan
                        </Button>
                      </div>

                      {/* Advanced Plan */}
                      <div className="border-2 border-primary rounded-lg p-6 space-y-4 relative">
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                          Current
                        </Badge>
                        <div>
                          <h3 className="text-lg font-semibold">Advanced</h3>
                          <p className="text-sm text-muted-foreground">Advanced protection for businesses</p>
                        </div>
                        <div className="text-3xl font-bold">
                          $0.99<span className="text-sm font-normal">/month</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Unlimited scans
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Advanced AI detection
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Multi-language support
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Priority support
                          </li>
                        </ul>
                        <Button className="w-full">Active Plan</Button>
                      </div>

                      {/* Comprehensive Plan */}
                      <div className="border border-border rounded-lg p-6 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Comprehensive</h3>
                          <p className="text-sm text-muted-foreground">Complete solution for large organizations</p>
                        </div>
                        <div className="text-3xl font-bold">
                          $2.99<span className="text-sm font-normal">/month</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Unlimited scans
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Custom AI models
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            API access
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            24/7 dedicated support
                          </li>
                        </ul>
                        <Button variant="outline" className="w-full bg-transparent">
                          Upgrade
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Manage your payment method and billing details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/27</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Next billing date</p>
                        <p className="text-sm text-muted-foreground">December 26, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$0.99</p>
                        <p className="text-sm text-muted-foreground">Monthly</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-balance">Settings</h2>
                <p className="text-muted-foreground text-pretty">Configure your threat detection preferences</p>
              </div>

              <div className="grid gap-6 max-w-2xl">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Manage your profile and account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                              type="text"
                              defaultValue="John Detective"
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email Address</label>
                            <input
                              type="email"
                              defaultValue="john@scamdetective.com"
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security & Privacy</CardTitle>
                    <CardDescription>Manage your account security and privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Collection</p>
                        <p className="text-sm text-muted-foreground">Allow anonymous usage analytics</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Control your data and account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Export Data</p>
                        <p className="text-sm text-muted-foreground">Download your scan history and reports</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Clear Scan History</p>
                        <p className="text-sm text-muted-foreground">Remove all stored scan data</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Clear
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-600">Delete Account</p>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detection Sensitivity</CardTitle>
                    <CardDescription>Adjust how sensitive the threat detection should be</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Sensitivity Level</label>
                          <span className="text-sm text-muted-foreground">{sensitivityLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sensitivityLevel}
                          onChange={(e) => setSensitivityLevel(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, rgb(16 185 129) 0%, rgb(16 185 129) ${sensitivityLevel}%, rgb(229 231 235) ${sensitivityLevel}%, rgb(229 231 235) 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sensitivityLevel < 33 && "Low sensitivity - May miss some threats but fewer false positives"}
                        {sensitivityLevel >= 33 &&
                          sensitivityLevel < 67 &&
                          "Medium sensitivity - Balanced detection with moderate false positives"}
                        {sensitivityLevel >= 67 &&
                          "High sensitivity - Catches more threats but may flag more false positives"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Selection Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Choose between light and dark mode for the interface</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        onClick={() => setTheme("light")}
                        className="flex items-center gap-2"
                      >
                        <Sun className="h-4 w-4" />
                        Light Mode
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        onClick={() => setTheme("dark")}
                        className="flex items-center gap-2"
                      >
                        <Moon className="h-4 w-4" />
                        Dark Mode
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Current theme: {theme === "light" ? "Light (white background)" : "Dark (dark gray background)"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Language Detection</CardTitle>
                    <CardDescription>Select languages for content analysis and threat detection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {languageOptions.map((language) => (
                        <div key={language.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={language.id}
                            checked={selectedLanguages.includes(language.id)}
                            onCheckedChange={(checked) => handleLanguageChange(language.id, checked as boolean)}
                          />
                          <label
                            htmlFor={language.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-base">{language.flag}</span>
                            {language.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Selected languages: {selectedLanguages.length} of {languageOptions.length}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure when you want to be notified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">High Threat Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified immediately for high-risk content</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Daily Summary</p>
                        <p className="text-sm text-muted-foreground">Receive daily reports of scan activity</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "reporting" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-balance">Scam Reporting</h2>
                <p className="text-muted-foreground text-pretty">
                  Report scams to relevant authorities automatically or manually
                </p>
              </div>

              <div className="grid gap-6 max-w-4xl">
                {/* Location & Auto-Reporting Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Location & Auto-Reporting
                    </CardTitle>
                    <CardDescription>
                      Configure your location for automatic reporting to local authorities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Your Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your country/region" />
                        </SelectTrigger>
                        <SelectContent>
                          {locationOptions.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              <div className="flex items-center gap-2">
                                <span>{location.flag}</span>
                                <span>{location.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Automatic Reporting</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically report high-threat scams to local authorities
                        </p>
                      </div>
                      <Button
                        variant={autoReporting ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAutoReporting(!autoReporting)}
                      >
                        {autoReporting ? "Enabled" : "Disabled"}
                      </Button>
                    </div>

                    {selectedLocationData && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          {selectedLocationData.flag} Relevant Authorities for {selectedLocationData.label}
                        </h4>
                        <ul className="space-y-1">
                          {selectedLocationData.authorities.map((authority, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-primary" />
                              {authority}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Manual Report Submission */}
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Report Submission</CardTitle>
                    <CardDescription>Submit a scam report directly to authorities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Scam Details</label>
                      <Textarea
                        placeholder="Describe the scam, including URLs, email addresses, phone numbers, or any other relevant information..."
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        rows={6}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={handleManualReport}
                        disabled={!reportContent.trim()}
                        className="flex items-center gap-2"
                      >
                        <Flag className="h-4 w-4" />
                        Submit Report
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Report will be sent to: {selectedLocationData?.authorities.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Report History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Report History</CardTitle>
                    <CardDescription>Track your submitted reports and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          type: "Automatic",
                          content: "Phishing website: fake-bank-login.com",
                          authority: "FBI IC3",
                          status: "Submitted",
                          time: "2 hours ago",
                        },
                        {
                          id: 2,
                          type: "Manual",
                          content: "Romance scam via dating app",
                          authority: "FTC",
                          status: "Under Review",
                          time: "1 day ago",
                        },
                        {
                          id: 3,
                          type: "Automatic",
                          content: "Cryptocurrency investment scam",
                          authority: "State Attorney General",
                          status: "Acknowledged",
                          time: "3 days ago",
                        },
                        {
                          id: 4,
                          type: "Manual",
                          content: "Tech support scam phone call",
                          authority: "FBI IC3",
                          status: "Closed",
                          time: "1 week ago",
                        },
                      ].map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <Flag className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{report.type} Report</p>
                              <p className="text-sm text-muted-foreground truncate max-w-md">{report.content}</p>
                              <p className="text-xs text-muted-foreground">Reported to: {report.authority}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                report.status === "Closed"
                                  ? "bg-primary text-primary-foreground"
                                  : report.status === "Under Review"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-muted text-muted-foreground"
                              }
                            >
                              {report.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{report.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reporting Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Reporting Statistics</CardTitle>
                    <CardDescription>Your contribution to fighting scams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-primary">47</p>
                        <p className="text-sm text-muted-foreground">Total Reports</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">32</p>
                        <p className="text-sm text-muted-foreground">Automatic</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">15</p>
                        <p className="text-sm text-muted-foreground">Manual</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">89%</p>
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
