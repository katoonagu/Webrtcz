import svgPaths from "./svg-zlv0ejyuz";

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

function ButtonUseMicro() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="button use micro">
      <div className="[grid-area:1_/_1] bg-[#0d6bde] h-[30px] ml-0 mt-0 relative rounded-[8px] w-[227px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[14px] justify-center ml-[37px] mt-[14px] not-italic relative text-[14px] text-white translate-y-[-50%] w-[178px]">
        <p className="leading-[18px]">Use microphone and camera</p>
      </div>
      <PepiconsPencilCamera />
    </div>
  );
}

export default function UseMicrophoneButton() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative size-full" data-name="Use microphone button">
      <ButtonUseMicro />
    </div>
  );
}