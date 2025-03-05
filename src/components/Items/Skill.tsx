import { useState } from "react"

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

const tabContent: Record<Tab, TabContentType> = {
  RTOS: {
    topRow: [
      { name: "FreeRTOS", type: "image" },
      { name: "Zephyr", type: "image" },
      { name: "NuttX RTOS", type: "image" },
    ],
    bottomRow: [
      
    ],
  },
  Frameworks: {
    topRow: [
      { name: "React", type: "image" },
      { name: "LVGL", type: "image" },
      { name: "QT", type: "image" },
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
      {name: "Dart", type: "image"},
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
      {name: "NXP", type: "image"},
      {name: "Texas Instruments", type: "image"},
    ],
  },
  Tools: {
    topRow: [
      {name: "Tailwind CSS", type: "image"},
      {name: "Bash", type: "image"},
      {name: "Markdown", type: "image"},
      {name: "GraphQL", type: "image"},
      {name: "Docker", type: "image"},
      {name: "Github", type: "image"},
    ],
    bottomRow: [
      {name: "Linux", type: "image"},
      {name: "Macos", type: "image"},
      {name: "Window", type: "image"},
    ],
  }
}

const TabContent = ({ content, isActive, tabId }: { content: TabContentType; isActive: boolean; tabId: Tab }) => {
  if (!isActive) return null

  return (
    <div key={tabId} className="mt-8 animate-fade-up">
      <div className="flex flex-wrap justify-center gap-4">
        {content.topRow.map((item, index) => (
          <ContentItem key={`${tabId}-top-${index}`} item={item} />
        ))}
      </div>
      {content.bottomRow.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {content.bottomRow.map((item, index) => (
            <ContentItem key={`${tabId}-bottom-${index}`} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

const ContentItem = ({ item }: { item: ContentItem }) => (
  <div className="p-4 border rounded-lg shadow border-white">
    {item.type === "image" ? (
      <img src={`/images/${item.name}.png`} alt={item.name} width={48} height={48} className="h-12 w-auto text-white" />
    ) : (
      item.name
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

