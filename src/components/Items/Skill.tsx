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
  Texas,
  C
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
  "MySQL": <MySQL size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "C": <C size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "C++": <Cpp size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Tailwind CSS": <TailwindCSS size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Next JS": <Nextjs size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Nodejs": <Nodejs size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "AWS": <AWS size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "TypeScript": <TypeScript size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Qt": <Qt size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "LVGL": <LVGL size='2.5em' className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />,
  "Linux": <Linux size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "RaspberryPi": <RaspberryPI size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Docker": <Docker size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Github": <Github size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Markdown": <Markdown size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Android": <Android size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Microsoft": <Microsoft size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Figma": <Figma size='2em' className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Astro": <AstroI size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Flutter": <Flutter size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Microchip": <Microchip size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "Espressif": <Espressif size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  "STMicroelectronics": <ST size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
  ".Net": <CSharp size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
  "Javascript": <JavaScript size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
  "GraphQL": <GraphQL size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
  "Bash": <Bash size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
  "Macos": <Apple size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
  "Windows": <Windows size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
  "AVR" : <ATMEL size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
  "NXP" : <NXP width="2.5em" height="1.2em" className="w-10 h-5 sm:w-14 sm:h-7 md:w-20 md:h-10"/>,
  "Texas Instruments": <Texas size="2em" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"/>,
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
  return (
    <div 
      className={`absolute inset-0 transition-all duration-300 ${
        isActive 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="mt-3 sm:mt-6 md:mt-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
          {content.topRow.map((item) => (
            <div key={`${tabId}-${item.name}`} className="flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              {iconMap[item.name] || <ContentItem item={item} />}
            </div>
          ))}
        </div>
        {content.bottomRow.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
            {content.bottomRow.map((item) => (
              <div key={`${tabId}-${item.name}`} className="transform hover:scale-110 transition-transform duration-200">
                {iconMap[item.name] || <ContentItem item={item} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const ContentItem = ({ item }: { item: ContentItem }) => (
  <div className="p-1 sm:p-2 md:p-4 flex items-center justify-center">
    {item.type === "image" ? (
      <img 
        src={`/images/${item.name}.png`} 
        alt={item.name} 
        width={32} 
        height={32} 
        className="h-6 w-auto sm:h-8 md:h-12 lg:h-16" 
        onError={(e) => {
          // Fallback to text if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          if (target.nextSibling) {
            (target.nextSibling as HTMLElement).style.display = 'block';
          }
        }}
      />
    ) : (
      <h1 className="text-sm sm:text-base md:text-lg lg:text-xl text-white uppercase font-semibold tracking-wide text-center">
        {item.name}
      </h1>
    )}
    {item.type === "image" && (
      <h1 
        className="text-sm sm:text-base md:text-lg lg:text-xl text-white uppercase font-semibold tracking-wide text-center" 
        style={{ display: 'none' }}
      >
        {item.name}
      </h1>
    )}
  </div>
)

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState<Tab>("RTOS")

  const handleTabClick = (tabId: Tab) => {
    console.log('Tab clicked:', tabId); // Debug log
    setActiveTab(tabId)
  }

  console.log('Current active tab:', activeTab); // Debug current state

  return (
    <section className="max-w-6xl mx-auto px-1 sm:px-2 md:px-4 py-4 sm:py-6 md:py-8 lg:py-12 text-center">
      <div className="border-b border-gray-200 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
        <nav className="flex justify-center -mb-px relative overflow-x-auto">
          <div className="flex min-w-max sm:min-w-0 px-1 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClick(tab.id);
                }}
                className={`pb-2 sm:pb-3 md:pb-4 px-3 sm:px-4 md:px-5 lg:px-6 relative transition-colors duration-200 font-medium text-sm sm:text-base md:text-lg whitespace-nowrap flex-shrink-0 cursor-pointer select-none ${
                  activeTab === tab.id 
                    ? "text-teal-400 border-b-2 border-teal-400" 
                    : "text-gray-300 hover:text-teal-300 border-b-2 border-transparent hover:border-teal-300/50"
                }`}
                aria-selected={activeTab === tab.id}
                role="tab"
                tabIndex={0}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="relative min-h-[120px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[250px]" role="tabpanel">
        {tabs.map((tab) => (
          <TabContent 
            key={tab.id} 
            tabId={tab.id} 
            content={tabContent[tab.id]} 
            isActive={activeTab === tab.id} 
          />
        ))}
      </div>
    </section>
  )
}
