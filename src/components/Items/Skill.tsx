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
  Linux, 
  RaspberryPI, 
  Qt, 
  VisualStudioCode, 
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
  Texas,C
} from '../Tools/Icons';

type Tab = "RTOS" | "Microcontrollers" | "Languages"| "Frameworks" | "Tools"

interface TabItem {
  id: Tab
  label: string
}

interface ContentItem {
  name: string
  type: "text" | "image"
}

interface TabContentType {
  topRow: ContentItem[]
  bottomRow: ContentItem[]
}

const tabs: TabItem[] = [
  { id: "RTOS", label: "RTOS" },
  { id: "Microcontrollers", label: "Microcontrollers" },
  { id: "Languages", label: "Languages" },
  { id: "Frameworks", label: "Frameworks" },
  { id: "Tools", label: "Tools" },
]

const iconMap: Record<string, ReactElement> = {
  "MySQL": <MySQL size='4.6em' />,
  "C": <C size='4.6em' />,
  "C++": <Cpp size='4.6em' />,
  "Tailwind CSS": <TailwindCSS size='4.6em' />,
  "Next JS": <Nextjs size='4.6em' />,
  "Nodejs": <Nodejs size='4.6em' />,
  "AWS": <AWS size='4.6em' />,
  "TypeScript": <TypeScript size='4.6em' />,
  "Qt": <Qt size='4.6em' />,
  "LVGL": <LVGL size='8.6em' />,
  "Linux": <Linux size='4.6em' />,
  "RaspberryPi": <RaspberryPI size='4.6em' />,
  "Docker": <Docker size='4.6em' />,
  "Github": <Github size='4.6em' />,
  "Markdown": <Markdown size='4.6em' />,
  "Android": <Android size='4.6em' />,
  "Microsoft": <Microsoft size='4.6em' />,
  "Figma": <Figma size='4.6em' />,
  "Astro": <AstroI size="4.6em" />,
  "Flutter": <Flutter size="4.6em" />,
  "Microchip": <Microchip size="4.6em" />,
  "Espressif": <Espressif size="4.6em" />,
  "STMicroelectronics": <ST size="4.6em" />,
  ".Net": <CSharp size="4.6em"/>,
  "Javascript": <JavaScript size="4.6em"/>,
  "GraphQL": <GraphQL size="4.6em"/>,
  "Bash": <Bash size="4.6em"/>,
  "Macos": <Apple size="4.6em"/>,
  "Windows": <Windows size="4.6em"/>,
  "AVR" : <ATMEL size="4.6em"/>,
  "NXP" : <NXP width="6.9em" height="3.3em"/>,
  "Texas Instruments": <Texas size="4.6em"/>,
}

const tabContent: Record<Tab, TabContentType> = {
  RTOS: {
    topRow: [
      { name: "FreeRTOS", type: "text" },
      { name: "Zephyr", type: "text" },
      { name: "NuttX RTOS", type: "text" },
    ],
    bottomRow: [],
  },
  Frameworks: {
    topRow: [
      { name: "LVGL", type: "image" },
      { name: "Qt", type: "image" },
      { name: "Next JS", type: "image" },
      { name: "Astro", type: "image" },
    ],
    bottomRow: [],
  },
  Languages: {
    topRow: [
      { name: "C++", type: "image" },
      { name: "C", type: "image" },
      { name: ".Net", type: "image" },
    ],
    bottomRow: [
      { name: "Javascript", type: "image" },
      { name: "Flutter", type: "image" },
    ],
  },
  Microcontrollers: {
    topRow: [
      { name: "Espressif", type: "image" },
      { name: "STMicroelectronics", type: "image" },
      { name: "RaspberryPi", type: "image" },
      { name: "Microchip", type: "image" },
      { name: "AVR", type: "image" },
    ],
    bottomRow: [
      { name: "NXP", type: "image" },
      { name: "Texas Instruments", type: "image" },
    ],
  },
  Tools: {
    topRow: [
      { name: "Tailwind CSS", type: "image" },
      { name: "Bash", type: "image" },
      { name: "Markdown", type: "image" },
      { name: "Docker", type: "image" },
      { name: "Github", type: "image" },
      { name: "GraphQL", type: "image" },
    ],
    bottomRow: [
      { name: "Linux", type: "image" },
      { name: "Macos", type: "image" },
      { name: "Windows", type: "image" },
    ],
  }
}

const TabContent = ({ content, isActive, tabId }: { content: TabContentType; isActive: boolean; tabId: Tab }) => {
  if (!isActive) return null

  return (
    <div key={tabId} className="mt-8 animate-fade-up">
      <div className="flex flex-wrap justify-center gap-12">
        {content.topRow.map((item) => (
          <div key={item.name} className="flex items-center justify-center">
            {iconMap[item.name] || <ContentItem item={item} />}
          </div>
        ))}
      </div>
      {content.bottomRow.length > 0 && (
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {content.bottomRow.map((item) => (
            <div key={item.name}>
              {iconMap[item.name] || <ContentItem item={item} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ContentItem = ({ item }: { item: ContentItem }) => (
  <div className="p-4">
    {item.type === "image" ? (
      <img src={`/images/${item.name}.png`} alt={item.name} width={48} height={48} className="h-12 w-auto text-white" />
    ) : (
      <h1 className="text-xl text-white uppercase">{item.name}</h1>
    )}
  </div>
)

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState<Tab>("RTOS")

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="border-b border-gray-200 mb-12">
        <nav className="flex justify-center -mb-px relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-6 relative ${
                activeTab === tab.id ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-200 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="relative">
        {(Object.entries(tabContent) as [Tab, TabContentType][]).map(([key, content]) => (
          <TabContent key={key} tabId={key} content={content} isActive={activeTab === key} />
        ))}
      </div>
    </section>
  )
}
