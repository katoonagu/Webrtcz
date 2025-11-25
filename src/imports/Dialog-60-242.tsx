import svgPaths from "./svg-blph0zlh8v";
import imgPepcPermissionDialogPlaceholderImage from "figma:asset/7b1ba7887207dd41fc9129ff6dc3896083b0036c.png";

interface DialogProps {
  onRequestPermissions: () => void | Promise<void>;
  hasError?: boolean;
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
    <div className="absolute content-stretch flex flex-col h-[69px] items-center left-[106px] right-[106px] top-[175px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a2b2d] text-[16px] text-center w-[262px]">
        <p className="leading-[32px]">Do you want people to see you in the meeting?</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-center left-[117px] right-[117px] top-[244px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#686f79] text-[14px] text-center w-[240px]">
        <p className="leading-[18px]">You can still turn off your microphone and camera anytime in the meeting</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[22.5%_17.5%_27.5%_12.5%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 10">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p29ff0380} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p24bebf00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function PepiconsPencilCamera() {
  return (
    <div className="[grid-area:1_/_1] ml-[13px] mt-[5px] overflow-clip relative size-[20px]" data-name="pepicons-pencil:camera">
      <Group />
    </div>
  );
}

function ButtonUseMicro({ onClick, hasError }: { onClick: () => void | Promise<void>; hasError: boolean }) {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 cursor-pointer"
      data-name="button use micro"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎤 Fixed Dialog: Клик на кнопку Use microphone and camera!');
        onClick();
      }}
    >
      <div className="[grid-area:1_/_1] bg-[#0d6bde] h-[30px] ml-0 mt-0 relative rounded-[8px] w-[227px] hover:bg-[#0c5dc7] transition-colors" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="[grid-area:1_/_1] absolute inset-0 flex items-center justify-center gap-2 pointer-events-none select-none">
        <div className="size-[20px] [--fill-0:white] relative flex-shrink-0">
          <Group />
        </div>
        <span className="font-['Segoe_UI:Regular',sans-serif] text-[14px] text-white leading-[18px]">Use microphone and camera</span>
      </div>
    </div>
  );
}

function UseMicrophoneButton({ onClick, hasError }: { onClick: () => void | Promise<void>; hasError: boolean }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-center justify-center left-[calc(50%-0.5px)] top-[296px] translate-x-[-50%] w-[227px]" data-name="Use microphone button">
      <ButtonUseMicro onClick={onClick} hasError={hasError} />
      {hasError && (
        <div className="w-full text-center px-2">
          <p className="font-['Segoe_UI:Regular',sans-serif] text-[13px] text-red-600 leading-[16px]">
            To continue, please give permission
          </p>
        </div>
      )}
    </div>
  );
}

function Button({ onClick }: { onClick: () => void | Promise<void> }) {
  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      data-name="Button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔵 Fixed Dialog: Клик на "Continue without..." - вызываем ту же логику!');
        onClick();
      }}
    >
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d6bde] text-[14px] text-center text-nowrap tracking-[-0.15px]">
        <p className="leading-[18px] whitespace-pre select-none">Continue without microphone and camera</p>
      </div>
    </div>
  );
}

function Container2({ onRequestPermissions }: { onRequestPermissions: () => void | Promise<void> }) {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-0 top-[335px]" data-name="Container">
      <Button onClick={onRequestPermissions} />
    </div>
  );
}

function Container3({ onRequestPermissions, hasError }: { onRequestPermissions: () => void | Promise<void>; hasError: boolean }) {
  return (
    <div className="h-[359px] relative shrink-0 w-full" data-name="Container">
      <PepcPermissionDialogPlaceholderImage />
      <Container />
      <Container1 />
      <UseMicrophoneButton onClick={onRequestPermissions} hasError={hasError} />
      <Container2 onRequestPermissions={onRequestPermissions} />
    </div>
  );
}

function Container4({ onRequestPermissions, hasError }: { onRequestPermissions: () => void | Promise<void>; hasError: boolean }) {
  return (
    <div className="box-border content-stretch flex flex-col h-[400px] items-center justify-center max-h-[400px] min-h-[38px] overflow-hidden pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <Container3 onRequestPermissions={onRequestPermissions} hasError={hasError} />
    </div>
  );
}

function BackgroundBorderShadow({ onRequestPermissions, hasError }: { onRequestPermissions: () => void | Promise<void>; hasError: boolean }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[447px] items-center justify-center pb-[47px] pt-[37px] px-[21px] relative rounded-[12px] shrink-0 w-[300px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(186,186,204,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_8px_24px_0px_rgba(35,35,51,0.1)]" />
      <Container4 onRequestPermissions={onRequestPermissions} hasError={hasError} />
    </div>
  );
}

export default function Dialog({ onRequestPermissions, hasError = false }: DialogProps) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[10px] size-full" data-name="Dialog">
      <BackgroundBorderShadow onRequestPermissions={onRequestPermissions} hasError={hasError} />
    </div>
  );
}