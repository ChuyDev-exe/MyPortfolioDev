import { useState, type ReactElement } from "react"
import { 
  Github,
  TailwindCSS, 
  AWS, 
  Nextjs, 
  AstroI, 
  Nodejs, 
  MySQL, 
  Cpp, 
  TypeScript, 
  RaspberryPI, 
  Qt, 
  Docker, 
  Android, 
  Microsoft,
  LVGL,
  Figma,
  Markdown,
  Flutter,
  Microchip,
  ST,
  Espressif,
  CSharp,
  JavaScript,
  GraphQL,
  Bash,
  Windows,
  Apple,
  ATMEL,
  NXP,
  Texas,
  C,
  Nginx,
  Shopify,
  WordPress,
  SpringBoot,
  React as ReactIcon,
  Angular,
  Java,
  Go,
  Redis
} from '../Tools/Icons';

type Tab = "Microcontrollers" | "Languages"| "Frameworks" | "Tools"

interface TabItem {
  id: Tab
  label: string
}

interface ContentItem {
  name: string
  icon?: ReactElement
}

const tabs: TabItem[] = [
  { id: "Microcontrollers", label: "Microcontrollers" },
  { id: "Languages", label: "Languages" },
  { id: "Frameworks", label: "Frameworks" },
  { id: "Tools", label: "Tools" },
]

const tabContent: Record<Tab, ContentItem[]> = {
  Frameworks: [
    { name: "LVGL", icon: <LVGL size='100%' /> },
    { name: "Qt", icon: <Qt size='100%' /> },
    { name: "React", icon: <ReactIcon size='100%' /> },
    { name: "Angular", icon: <Angular size='100%' /> },
    { name: "SpringBoot", icon: <SpringBoot size='100%' /> },
    { name: "Next JS", icon: <Nextjs size='100%' /> },
    { name: "Astro", icon: <AstroI size='100%' /> },
  ],
  Languages: [
    { name: "C++", icon: <Cpp size='100%' /> },
    { name: "C", icon: <C size='100%' /> },
    { name: "Java", icon: <Java width='100%' height='100%' /> },
    { name: "Javascript", icon: <JavaScript size='100%' /> },
    { name: "TypeScript", icon: <TypeScript size='100%' /> },
    { name: "Flutter", icon: <Flutter size='100%' /> },
    { name: ".Net", icon: <CSharp size='100%' /> },
    { name: "Go", icon: <Go size='100%' /> },
  ],
  Microcontrollers: [
    { name: "Espressif", icon: <Espressif size='100%' /> },
    { name: "STMicroelectronics", icon: <ST size='100%' /> },
    { name: "NXP", icon: <NXP width="100%" height="100%" /> },
    { name: "Texas Instruments", icon: <Texas size='100%' /> },
    { name: "RaspberryPi", icon: <RaspberryPI size='100%' /> },
    { name: "AVR", icon: <ATMEL size='100%' /> },
    { name: "Microchip", icon: <Microchip size='100%' /> },
  ],
  Tools: [
    { name: "Tailwind CSS", icon: <TailwindCSS size='100%' /> },
    { name: "Bash", icon: <Bash size='100%' /> },
    { name: "Markdown", icon: <Markdown size='100%' /> },
    { name: "Docker", icon: <Docker size='100%' /> },
    { name: "Github", icon: <Github size='100%' /> },
    { name: "GraphQL", icon: <GraphQL size='100%' /> },
    { name: "Wordpress", icon: <WordPress size='100%' /> },
    { name: "Nginx", icon: <Nginx size='100%' /> },
    { name: "Shopify", icon: <Shopify size='100%' /> },
    { name: "Redis", icon: <Redis size='100%' /> },
    { name: "AWS", icon: <AWS size='100%' /> },
    { name: "Figma", icon: <Figma size='100%' /> },
    { name: "Android", icon: <Android size='100%' /> },
    { name: "MacOS", icon: <Apple size='100%' /> },
    { name: "Windows", icon: <Windows size='100%' /> },
  ]
}

// Helper to render icons with consistent sizing
const SkillCard = ({ item, index }: { item: ContentItem; index: number }) => (
  <div 
    className="group flex flex-col items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 opacity-0 animate-fade-up"
    style={{ 
      animationDelay: `${index * 50}ms`,
      animationFillMode: 'forwards'
    }}
  >
    <div className="w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center text-gray-500 group-hover:text-[#51E4B8] transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0">
      {item.icon || <span className="text-2xl font-bold">{item.name[0]}</span>}
    </div>
    <span className="text-xs sm:text-base font-medium text-gray-500 group-hover:text-white transition-colors duration-300 text-center">
      {item.name}
    </span>
  </div>
)

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState<Tab>("Frameworks")

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8 sm:mb-16">
        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 rounded-3xl sm:rounded-full border border-white/10 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-base font-medium transition-all duration-300
                ${activeTab === tab.id 
                  ? "bg-[#51E4B8] text-[#0a0a0a] shadow-[0_0_20px_-5px_#51E4B8]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
          <div
            key={activeTab}
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-10"
          >
            {tabContent[activeTab].map((item, index) => (
              <SkillCard key={item.name} item={item} index={index} />
            ))}
          </div>
      </div>
    </section>
  )
}