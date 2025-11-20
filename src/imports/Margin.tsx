import svgPaths from "./svg-3dp5fnucaj";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[80px] text-center text-nowrap text-[#3c4043]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[100px] whitespace-pre">Ready to join?</p>
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
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[40px] px-0 relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[35px] text-center text-nowrap text-[#5f6368]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[50px] whitespace-pre">No one else is here</p>
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
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[10px] px-0 relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[60px]" data-name="Container">
      <div className="absolute bg-[#185abc] h-[120px] left-0 opacity-0 rounded-[60px] top-0 w-[360px]" data-name="Background" />
      <div className="absolute bg-[#185abc] h-[120px] left-0 opacity-0 rounded-[60px] top-0 w-[360px]" data-name="Background" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[35px] text-center text-nowrap text-white tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[90px] whitespace-pre">Join now</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1a73e8] box-border content-stretch flex flex-col h-[120px] items-center justify-center min-w-[160px] px-[60px] py-0 relative rounded-[60px] shrink-0" data-name="Button">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Button />
    </div>
  );
}

function Container9() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[40px] px-0 relative shrink-0" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[60px]" data-name="Container">
      <div className="absolute bg-[#d2e3fc] h-[120px] left-0 opacity-0 rounded-[60px] top-0 w-[640px]" data-name="Background" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[35px] text-center text-nowrap text-[#1a73e8] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[90px] whitespace-pre">Other ways to join</p>
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
    <div className="relative shrink-0 size-[45px]" data-name="SVG">
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
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[5px] px-0 relative shrink-0" data-name="Container">
      <Container14 />
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[20px] h-[120px] items-center justify-center min-w-[160px] pl-[60px] pr-[55px] py-0 relative rounded-[60px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[2.5px] border-[#dadce0] border-solid inset-0 pointer-events-none rounded-[60px]" />
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
    <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[20px] px-0 relative shrink-0" data-name="Container">
      <Container16 />
    </div>
  );
}

export default function Margin2() {
  return (
    <div className="relative shrink-0 w-[1180px]" data-name="Margin">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[40px] pl-[20px] pr-[40px] pt-[40px] relative size-full">
          <Container2 />
          <Container5 />
          <Container9 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}