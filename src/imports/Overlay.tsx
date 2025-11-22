import svgPaths from "./svg-5msz747bdg";
import imgPepcPermissionDialogPlaceholderImage from "figma:asset/7b1ba7887207dd41fc9129ff6dc3896083b0036c.png";
import PepiconsPencilCamera from "./PepiconsPencilCamera";
import svgPathsCamera from "./svg-zlv0ejyuz";

interface OverlayProps {
  onRequestPermissions: () => Promise<void>;
}

function PepcPermissionDialogPlaceholderImage() {
  return (
    <div className="absolute h-[155px] left-1/2 top-0 translate-x-[-50%] w-[200px]" data-name="pepc-permission-dialog placeholder-image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPepcPermissionDialogPlaceholderImage} />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[175px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a2b2d] text-[16px] text-center text-nowrap">
        <p className="leading-[32px] whitespace-pre">Do you want people to see you in the meeting?</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[207px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#686f79] text-[14px] text-center text-nowrap">
        <p className="leading-[18px] whitespace-pre">You can still turn off your microphone and camera anytime in the meeting</p>
      </div>
    </div>
  );
}

function MdiMicrophoneOutline() {
  return (
    <div className="absolute left-[177px] size-[16px] top-[250.5px]" data-name="mdi:microphone-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="mdi:microphone-outline">
          <path d={svgPaths.p256a740} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[177px] top-[250.5px]">
      <div className="absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[13px] justify-center leading-[0] left-[calc(50%-38px)] not-italic text-[14px] text-white top-[258px] translate-y-[-50%] w-[102px]">
        <p className="leading-[18px]">Use microphone</p>
      </div>
      <MdiMicrophoneOutline />
    </div>
  );
}

function UseMicrophoneButton({ onClick }: { onClick: () => void | Promise<void> }) {
  return (
    <div
      className="absolute contents left-[calc(50%-0.5px)] top-[243.5px] translate-x-[-50%]"
      data-name="Use microphone button"
    >
      <div
        className="absolute bg-[#0d6bde] h-[30px] left-[calc(50%-113.5px)] rounded-[8px] top-[243.5px] w-[227px] cursor-pointer hover:bg-[#0c5dc7] transition-colors select-none"
        data-name="Background+Border"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🎤 Overlay: Клик на кнопку Use microphone and camera - запускаем НАПРЯМУЮ!');
          onClick();
        }}
      >
        <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="absolute inset-0 flex items-center justify-center gap-2 select-none pointer-events-none">
          <div className="size-[20px] [--fill-0:white] relative">
            <div className="absolute inset-[22.5%_17.5%_27.5%_12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 10">
                <g>
                  <path clipRule="evenodd" d={svgPathsCamera.p29ff0380} fill="white" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPathsCamera.p24bebf00} fill="white" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
          <span className="font-['Segoe_UI:Regular',sans-serif] text-[14px] text-white leading-[18px]">Use microphone and camera</span>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d6bde] text-[14px] text-center text-nowrap tracking-[-0.15px]">
        <p className="leading-[18px] whitespace-pre">Continue without microphone and camera</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-0 top-[287px]" data-name="Container">
      <Button />
    </div>
  );
}

function Container3({ onRequestPermissions }: { onRequestPermissions: () => void }) {
  return (
    <div className="h-[305px] relative shrink-0 w-full" data-name="Container">
      <PepcPermissionDialogPlaceholderImage />
      <Container />
      <Container1 />
      <UseMicrophoneButton onClick={onRequestPermissions} />
      <Container2 />
    </div>
  );
}

function Container4({ onRequestPermissions }: { onRequestPermissions: () => void }) {
  return (
    <div className="box-border content-stretch flex flex-col items-start max-h-[400px] min-h-[38px] overflow-auto pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <Container3 onRequestPermissions={onRequestPermissions} />
    </div>
  );
}

function BackgroundBorderShadow({ onRequestPermissions }: { onRequestPermissions: () => void }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start pb-[47px] pt-[37px] px-[21px] relative rounded-[12px] shrink-0 w-[516px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(186,186,204,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_8px_24px_0px_rgba(35,35,51,0.1)]" />
      <Container4 onRequestPermissions={onRequestPermissions} />
    </div>
  );
}

function Dialog({ onRequestPermissions }: { onRequestPermissions: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[4px]" data-name="Dialog">
      <BackgroundBorderShadow onRequestPermissions={onRequestPermissions} />
    </div>
  );
}

export default function Overlay({ onRequestPermissions }: OverlayProps) {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] fixed inset-0 z-50 flex items-center justify-center" data-name="Overlay">
      <Dialog onRequestPermissions={onRequestPermissions} />
    </div>
  );
}