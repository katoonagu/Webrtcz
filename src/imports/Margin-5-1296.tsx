import svgPaths from "./svg-qewxi7zzc7";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-2xl sm:text-[32px] text-center text-nowrap text-[#3c4043]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-normal sm:leading-[40px] whitespace-pre">Ready to join?</p>
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
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[16px] px-0 relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-[#5f6368]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">No one else is here</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[4px] px-0 relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[24px]" data-name="Container">
      <div className="absolute bg-[#185abc] h-[48px] left-0 opacity-0 rounded-[24px] top-0 w-[144px]" data-name="Background" />
      <div className="absolute bg-[#185abc] h-[48px] left-0 opacity-0 rounded-[24px] top-0 w-[144px]" data-name="Background" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[36px] whitespace-pre">Join now</p>
      </div>
    </div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-[#1a73e8] box-border content-stretch flex flex-col h-[48px] items-center justify-center min-w-[64px] px-[24px] py-0 relative rounded-[24px] shrink-0 cursor-pointer" 
      data-name="Button"
      onClick={onClick}
    >
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container8({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Button onClick={onClick} />
    </div>
  );
}

function Container9({ onClick }: { onClick?: () => void }) {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[16px] px-0 relative shrink-0" data-name="Container">
      <Container8 onClick={onClick} />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[24px]" data-name="Container">
      <div className="absolute bg-[#d2e3fc] h-[48px] left-0 opacity-0 rounded-[24px] top-0 w-[256px]" data-name="Background" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-[#1a73e8] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[36px] whitespace-pre">Other ways to join</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container11 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p233ed100} fill="var(--fill-0, #1A73E8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0" data-name="Container">
      <Container14 />
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center min-w-[64px] pl-[24px] pr-[22px] py-0 relative rounded-[24px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#dadce0] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container10 />
      <Container12 />
      <Container15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Button1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[8px] px-0 relative shrink-0" data-name="Container">
      <Container16 />
    </div>
  );
}

export default function Margin2({ onJoinNow }: { onJoinNow?: () => void }) {
  return (
    <div className="w-full lg:h-[572px] relative shrink-0 lg:w-[472px]" data-name="Margin">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center pb-2 sm:pb-[16px] pl-1 sm:pl-[8px] pr-2 sm:pr-[16px] pt-2 sm:pt-[16px] relative size-full">
          <Container2 />
          <Container5 />
          <Container9 onClick={onJoinNow} />
          <Container17 />
        </div>
      </div>
    </div>
  );
}