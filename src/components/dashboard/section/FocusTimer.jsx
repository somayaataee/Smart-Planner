import { FocusIcon, ListStart, Play } from "lucide-react";

export default function FocusTimer(){
    return(
        <>
        <div style={{text:'var(--text)',borderColor:'var(--border)',background:'var(--card)'}} className=" w-100 md:w-50  mr-2 mt-2 p-6 text-center border rounded-2xl ">
            <h1>Focus Timer</h1>
        <div className="relative w-25 h-25 flex items-center justify-center m-auto">
                <svg
                  className="absolute"
                  width="100"
                  height="100"
                  viewBox="0 0 300 300"
                >
                  {/* دایره پس‌زمینه */}
                  <circle 
                    cx="150"
                    cy="150"
                    r="120"
                    stroke="#9d2d3a"
                    strokeWidth="10"
                    fill="none"
                  />

                {/* دایره پیشرفت */}
                <circle 
                  cx="150"
                  cy="150"
                  r="120"
                  stroke="#81bcf6"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 150 150)"
                />
              </svg>
              <h1 className="text-xl font-bold text-white z-10">
                25:00
              </h1>
            </div>
        <div>
        </div>
        </div>        
        </>
    )
}