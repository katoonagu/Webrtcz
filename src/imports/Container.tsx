import svgPaths from "./svg-jfhk1fk82q";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 px-2 sm:px-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-base sm:text-[22px] text-center text-wrap sm:text-nowrap text-white px-2" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-tight sm:leading-[28px] whitespace-pre-wrap sm:whitespace-pre">Do you want people to see and hear you in the meeting?</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[4px]" data-name="Container">
      <div className="absolute bg-[#202124] h-[72px] left-[-124.72px] opacity-0 rounded-[142.72px] top-[-18px] w-[498.88px]" data-name="Background" />
      <div className="absolute bg-[#202124] h-[72px] left-[-124.72px] opacity-0 rounded-[142.72px] top-[-18px] w-[498.88px]" data-name="Background" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] whitespace-pre">Allow microphone and camera</p>
      </div>
    </div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-[#1a73e8] box-border content-stretch flex flex-col h-[36px] items-center justify-center min-w-[64px] px-[24px] py-0 relative rounded-[4px] shrink-0 cursor-pointer" 
      data-name="Button"
      onClick={onClick}
    >
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container4({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Button onClick={onClick} />
    </div>
  );
}

function Container5({ onClick }: { onClick?: () => void }) {
  return (
    <div className="box-border content-stretch flex flex-col items-center px-0 py-[15px] relative shrink-0" data-name="Container">
      <Container4 onClick={onClick} />
    </div>
  );
}

function Alert({ onClick }: { onClick?: () => void }) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Alert">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center p-[5px] relative size-full">
          <Container1 />
          <Container5 onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

function Background({ onClick }: { onClick?: () => void }) {
  return (
    <div className="absolute bg-[#202124] content-stretch flex flex-col inset-0 items-start justify-center overflow-clip" data-name="Background">
      <Alert onClick={onClick} />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2bb39080} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container7 />
    </div>
  );
}

function ButtonMicrophoneProblemShowMoreInfo() {
  return (
    <div className="bg-[#ea4335] relative rounded-[28px] shrink-0 size-[48px] sm:size-[56px]" data-name="Button - Microphone problem. Show more info">
      <div className="box-border content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-[48px] sm:size-[56px]">
        <Container8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ea4335] border-solid inset-0 pointer-events-none rounded-[28px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[14px]" data-name="Container">
      <div className="absolute bg-[#fa7b17] left-0 opacity-0 rounded-[14px] size-[28px] top-0" data-name="Background" />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[28px] relative w-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
        <g id="Icon">
          <path d={svgPaths.p22fa9500} fill="var(--fill-0, #FA7B17)" id="Vector" />
          <g id="Mask group">
            <mask height="20" id="mask0_3_468" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="2" y="4">
              <path d={svgPaths.p23045200} fill="var(--fill-0, #FA7B17)" id="Vector_2" />
            </mask>
            <g mask="url(#mask0_3_468)">
              <rect fill="var(--fill-0, white)" height="13" id="Rectangle 1" transform="matrix(1 0 0 -1 10 20.125)" width="4" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-center relative shrink-0 w-[24px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function ButtonMicrophoneProblemShowMoreInfo1() {
  return (
    <div className="box-border content-stretch flex items-center justify-center p-[2px] relative rounded-[14px] shrink-0 size-[28px]" data-name="Button - Microphone problem. Show more info">
      <div className="absolute bg-[#fa7b17] left-[6px] rounded-[8px] size-[16px] top-[5.88px]" data-name="Background" />
      <Container9 />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[-3px] top-[-5px]" data-name="Container">
      <ButtonMicrophoneProblemShowMoreInfo1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <ButtonMicrophoneProblemShowMoreInfo />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Container13 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p3a4b9380} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container16 />
    </div>
  );
}

function ButtonCameraProblemShowMoreInfo() {
  return (
    <div className="bg-[#ea4335] relative rounded-[28px] shrink-0 size-[48px] sm:size-[56px]" data-name="Button - Camera problem. Show more info">
      <div className="box-border content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-[48px] sm:size-[56px]">
        <Container17 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ea4335] border-solid inset-0 pointer-events-none rounded-[28px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[14px]" data-name="Container">
      <div className="absolute bg-[#fa7b17] left-0 opacity-0 rounded-[14px] size-[28px] top-0" data-name="Background" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[28px] relative w-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
        <g id="Icon">
          <path d={svgPaths.p22fa9500} fill="var(--fill-0, #FA7B17)" id="Vector" />
          <g id="Mask group">
            <mask height="20" id="mask0_3_468" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="2" y="4">
              <path d={svgPaths.p23045200} fill="var(--fill-0, #FA7B17)" id="Vector_2" />
            </mask>
            <g mask="url(#mask0_3_468)">
              <rect fill="var(--fill-0, white)" height="13" id="Rectangle 1" transform="matrix(1 0 0 -1 10 20.125)" width="4" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-center relative shrink-0 w-[24px]" data-name="Container">
      <Container19 />
    </div>
  );
}

function ButtonMicrophoneProblemShowMoreInfo2() {
  return (
    <div className="box-border content-stretch flex items-center justify-center p-[2px] relative rounded-[14px] shrink-0 size-[28px]" data-name="Button - Microphone problem. Show more info">
      <div className="absolute bg-[#fa7b17] left-[6px] rounded-[8px] size-[16px] top-[5.88px]" data-name="Background" />
      <Container18 />
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[-3px] top-[-5px]" data-name="Container">
      <ButtonMicrophoneProblemShowMoreInfo2 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <ButtonCameraProblemShowMoreInfo />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex gap-[24px] items-start left-[40.81%] right-[40.81%]" data-name="Container">
      <Container14 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Nikita Foryu</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="box-border content-stretch flex flex-col items-start overflow-clip px-[16px] py-[8px] relative shrink-0" data-name="Container">
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute box-border content-stretch flex h-[44px] items-center left-0 max-w-[376px] pl-0 pr-[2px] py-0 top-[12px]" data-name="Container">
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[24px]" data-name="Container">
      <div className="absolute bg-white left-0 opacity-0 rounded-[24px] size-[48px] top-0" data-name="Background" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[28px] relative w-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
        <g id="Icon">
          <path d={svgPaths.p380f0980} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-center relative shrink-0 w-[24px]" data-name="Container">
      <Container29 />
    </div>
  );
}

function ButtonMenuMoreOptions() {
  return (
    <div className="box-border content-stretch flex items-center justify-center p-[12px] relative rounded-[24px] shrink-0 size-[48px]" data-name="Button menu - More options">
      <Container28 />
      <Container30 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <ButtonMenuMoreOptions />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start px-[4px] py-0 right-[6px] top-[10px]" data-name="Container">
      <Container31 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[28px] relative w-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
        <g id="Icon">
          <path d={svgPaths.p3251c600} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container34 />
    </div>
  );
}

function ButtonBackgroundsAndEffects() {
  return (
    <div className="relative rounded-[28px] shrink-0 size-[56px]" data-name="Button - Backgrounds and effects">
      <div className="box-border content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-[56px]">
        <Container35 />
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[28px]" />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col items-start right-[10px]" data-name="Container">
      <ButtonBackgroundsAndEffects />
    </div>
  );
}

function Container37({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-auto min-h-[280px] sm:min-h-[350px] md:h-[416.25px] aspect-video md:aspect-auto relative shrink-0 w-full" data-name="Container">
      <Background onClick={onClick} />
      <Container24 />
      <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.7)] h-[80px] left-0 right-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(0,0,0,0.3)]" data-name="Gradient" />
      <Container27 />
      <Container32 />
      <Container36 />
    </div>
  );
}

function Container38({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-center sm:min-w-[320px] overflow-clip relative rounded-[12px] sm:rounded-[16px] shrink-0 w-full" data-name="Container">
      <Container37 onClick={onClick} />
    </div>
  );
}

function Margin({ onRequestPermissions }: { onRequestPermissions?: () => void }) {
  return (
    <div className="w-full lg:basis-0 lg:grow min-h-px lg:min-w-[472px] relative shrink-0" data-name="Margin">
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start min-w-inherit pl-2 sm:pl-[16px] pr-1 sm:pr-[8px] py-2 sm:py-[16px] relative size-full">
          <Container38 onClick={onRequestPermissions} />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute inset-[3.13%_0.6%_3.13%_0.59%] overflow-clip rounded-[16px]" data-name="Container">
      <div className="absolute bg-[#444746] h-[30px] left-0 opacity-0 rounded-[16px] top-0 w-[166px]" data-name="Background" />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[24px] relative w-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 24">
        <g id="Icon">
          <path d={svgPaths.p150a6400} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[20px]" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="box-border content-stretch flex flex-col items-center overflow-clip pl-0 pr-[1.48px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(31,31,31,0.38)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Permission …</p>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <g id="Vector"></g>
          <path d={svgPaths.p2c82e500} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Svg2 />
    </div>
  );
}

function ButtonMenuMicrophonePermissionNeeded() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[32px] items-center min-w-[64px] px-[17px] py-px relative rounded-[16px] shrink-0" data-name="Button menu - Microphone: Permission needed">
      <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.12)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container39 />
      <Container42 />
      <Container43 />
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <ButtonMenuMicrophonePermissionNeeded />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start relative shrink-0 w-[168px]" data-name="Container">
      <Container45 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute inset-[3.13%_0.6%] overflow-clip rounded-[16px]" data-name="Container">
      <div className="absolute bg-[#444746] h-[30px] left-0 opacity-0 rounded-[16px] top-0 w-[166px]" data-name="Background" />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p3951aa00} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector" />
          <path d={svgPaths.p3773d540} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector_2" />
          <path d={svgPaths.p198ea580} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="box-border content-stretch flex items-start pb-[3px] pt-0 px-0 relative shrink-0" data-name="Container">
      <Svg3 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <Container48 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex items-start left-[17px] top-[calc(50%+1.5px)] translate-y-[-50%]" data-name="Container">
      <Container49 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-center left-[41px] overflow-clip pl-0 pr-[1.48px] py-0 top-[calc(50%-1px)] translate-y-[-50%]" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(31,31,31,0.38)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Permission …</p>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <g id="Vector"></g>
          <path d={svgPaths.p2c82e500} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex items-start right-[17px] top-1/2 translate-y-[-50%]" data-name="Container">
      <Svg4 />
    </div>
  );
}

function ButtonMenuSpeakerPermissionNeeded() {
  return (
    <div className="h-[32px] min-w-[64px] relative rounded-[16px] shrink-0 w-[168px]" data-name="Button menu - Speaker: Permission needed">
      <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.12)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container47 />
      <Container50 />
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container53() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <ButtonMenuSpeakerPermissionNeeded />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start relative shrink-0 w-[168px]" data-name="Container">
      <Container53 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute inset-[3.13%_0.6%_3.13%_0.59%] overflow-clip rounded-[16px]" data-name="Container">
      <div className="absolute bg-[#444746] h-[30px] left-0 opacity-0 rounded-[16px] top-0 w-[166px]" data-name="Background" />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[24px] relative w-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 24">
        <g id="Icon">
          <path d={svgPaths.p2e0a67c0} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[20px]" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <Container56 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container57 />
    </div>
  );
}

function Container59() {
  return (
    <div className="box-border content-stretch flex flex-col items-center overflow-clip pl-0 pr-[1.48px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(31,31,31,0.38)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Permission …</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <g id="Vector"></g>
          <path d={svgPaths.p2c82e500} fill="var(--fill-0, #1F1F1F)" fillOpacity="0.38" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Svg5 />
    </div>
  );
}

function ButtonMenuCameraPermissionNeeded() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[32px] items-center min-w-[64px] px-[17px] py-px relative rounded-[16px] shrink-0" data-name="Button menu - Camera: Permission needed">
      <div aria-hidden="true" className="absolute border border-[rgba(31,31,31,0.12)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container55 />
      <Container58 />
      <Container59 />
      <Container60 />
    </div>
  );
}

function Container61() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <ButtonMenuCameraPermissionNeeded />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start relative shrink-0 w-[168px]" data-name="Container">
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[5.3px] h-full items-start max-w-[525px] relative shrink-0 w-[525px]" data-name="Container">
      <Container46 />
      <Container54 />
      <Container62 />
    </div>
  );
}

function Container64() {
  return (
    <div className="box-border content-stretch flex h-[40px] items-start justify-center pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <Container63 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0 w-full hidden sm:block" data-name="Margin">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[10px] pl-[16px] pr-[8px] pt-0 relative w-full">
          <Container64 />
        </div>
      </div>
    </div>
  );
}

export default function Container65({ onRequestPermissions }: { onRequestPermissions?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Margin onRequestPermissions={onRequestPermissions} />
      <Margin1 />
    </div>
  );
}