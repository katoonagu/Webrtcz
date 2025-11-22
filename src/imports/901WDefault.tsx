import svgPaths from "./svg-i8si199k88";
import { imgGroup } from "./svg-99bvh";

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.pdd1d000} fill="var(--fill-0, #0E72ED)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex items-center left-[38px] top-[31.5px]" data-name="Button">
      <Svg />
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0e72ed] text-[14px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Back</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12.5px_25px] mask-size-[175px_150px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 200">
        <g id="Group">
          <path d="M200 0H0V200H200V0Z" fill="var(--fill-0, #4A4A4A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[12.5%_6.25%]" data-name="Mask group">
      <Group />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[200px]" data-name="SVG">
      <MaskGroup />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center rounded-[14px]" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[32px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 24">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p42b9300} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1cdf3c00} fill="var(--fill-0, #FF0055)" fillRule="evenodd" id="Vector_2" />
          <path d="M3.375 19.875L20.625 2.625" id="Vector_3" stroke="var(--stroke-0, #FF0055)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.50062" />
          <path clipRule="evenodd" d={svgPaths.p1cdf3c00} fill="var(--fill-0, #FF0055)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ButtonMute() {
  return (
    <div className="basis-0 bg-[#252a30] content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[10px] shrink-0 w-full" data-name="Button - Mute">
      <Svg2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[40px]" data-name="Container">
      <ButtonMute />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-[4px] py-0 relative shrink-0 w-[48px]" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="h-[25px] relative shrink-0 w-[38px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 25">
        <g id="SVG">
          <path d={svgPaths.p1c1c8471} fill="var(--fill-0, white)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3dc91200} fill="var(--fill-0, #FF0055)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonStopVideo() {
  return (
    <div className="basis-0 bg-[#252a30] content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[10px] shrink-0 w-full" data-name="Button - Stop Video">
      <Svg3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[40px]" data-name="Container">
      <ButtonStopVideo />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-[4px] py-0 relative shrink-0 w-[48px]" data-name="Margin">
      <Container2 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p327c51f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonStopVideo1() {
  return (
    <div className="basis-0 bg-[#252a30] content-stretch flex grow items-center justify-center min-h-px min-w-px relative rounded-[8px] shrink-0 w-full" data-name="Button - Stop Video">
      <Svg4 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[40px]" data-name="Container">
      <ButtonStopVideo1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-[4px] py-0 relative shrink-0 w-[48px]" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bottom-[8px] content-stretch flex h-[40px] items-start justify-center left-1/2 rounded-[10px] translate-x-[-50%] w-[176px]" data-name="Container">
      <Margin />
      <Margin1 />
      <Margin2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow h-[252px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container />
      <Container4 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#242424] content-stretch flex items-center justify-center max-w-[700px] min-w-[448px] relative rounded-[14px] shrink-0 w-full" data-name="Background">
      <Container5 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="basis-0 grow max-w-[740px] min-h-px min-w-[488px] relative shrink-0" data-name="Margin">
      <div className="max-w-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit min-w-inherit px-[20px] py-0 relative w-full">
          <Background />
        </div>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[89.59px] pb-[24px] pt-0 px-0 top-0" data-name="Margin">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a4a4a] text-[24px] text-nowrap">
        <p className="leading-[36px] whitespace-pre">Enter Meeting Info</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#131619] text-[14px] w-full">
        <p className="leading-[20px]">Your Name</p>
      </div>
    </div>
  );
}

function LabelMargin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[5px] pt-0 px-0 relative shrink-0 w-full" data-name="Label:margin">
      <Label />
    </div>
  );
}

function Input() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border-2 border-[#98a0a9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Input />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <LabelMargin />
      <Container6 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[12px] pt-0 px-0 right-0 top-[60px]" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="box-border content-stretch flex items-start pl-[20px] pr-0 py-0 relative shrink-0" data-name="Checkbox">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a4a4a] text-[13px] text-nowrap">
        <p className="leading-[19.5px] whitespace-pre">Remember my name for future meetings</p>
      </div>
      <div className="absolute bg-gradient-to-b from-[#eeedee] left-[-1px] rounded-[3.6px] size-[16px] to-30% to-[#ffffff] top-1/2 translate-y-[-50%]" data-name="Gradient+Border">
        <div aria-hidden="true" className="absolute border border-[#a8a8a8] border-solid inset-0 pointer-events-none rounded-[3.6px]" />
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[12px] px-0 top-[137px]" data-name="Margin">
      <Checkbox />
    </div>
  );
}

function LinkTermsOfService() {
  return (
    <div className="absolute content-stretch flex items-start left-[218.13px] top-0" data-name="Link - Terms of Service">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#40a9ff] text-[14px] text-nowrap">
        <p className="leading-[21px] whitespace-pre">Terms of Service</p>
      </div>
    </div>
  );
}

function LinkPrivacyStatement() {
  return (
    <div className="absolute content-stretch flex items-start left-0 top-[21px]" data-name="Link - Privacy Statement">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#40a9ff] text-[14px] text-nowrap">
        <p className="leading-[21px] whitespace-pre">Privacy Statement</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[42px] relative shrink-0 w-[392px]" data-name="Container">
      <div className="absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[21px] justify-center leading-[0] left-0 not-italic text-[#131619] text-[14px] top-[10.5px] translate-y-[-50%] w-[218.5px]">
        <p className="leading-[21px]">{`By clicking "Join", you agree to our `}</p>
      </div>
      <LinkTermsOfService />
      <div className="absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[21px] justify-center leading-[0] left-[318.05px] not-italic text-[#131619] text-[14px] top-[10.5px] translate-y-[-50%] w-[27.493px]">
        <p className="leading-[21px]">{` and`}</p>
      </div>
      <LinkPrivacyStatement />
      <div className="absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[21px] justify-center leading-[0] left-[109.98px] not-italic text-[#131619] text-[14px] top-[31.5px] translate-y-[-50%] w-[3.352px]">
        <p className="leading-[21px]">.</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[16px] px-0 top-[248.5px]" data-name="Margin">
      <Container8 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute font-['Segoe_UI:Regular',sans-serif] h-[35px] leading-[0] left-0 not-italic text-[#0e72ed] text-[14px] top-[-2px] w-[314.53px]" data-name="Link">
      <div className="absolute flex flex-col h-[16px] justify-center left-[271.36px] top-[9.5px] translate-y-[-50%] w-[43.502px]">
        <p className="leading-[16px]">Privacy</p>
      </div>
      <div className="absolute flex flex-col h-[16px] justify-center left-0 top-[25.5px] translate-y-[-50%] w-[35.858px]">
        <p className="leading-[16px]">Policy</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[66.52px] px-0 py-[1.5px] top-[14px]" data-name="Link">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0e72ed] text-[14px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">Terms of Service</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[32px] relative shrink-0 w-[392px]" data-name="Container">
      <div className="absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[16px] justify-center leading-[0] left-0 not-italic text-[#131619] text-[14px] top-[7.5px] translate-y-[-50%] w-[271.666px]">
        <p className="leading-[16px]">{`Zoom is protected by reCAPTCHA and their `}</p>
      </div>
      <Link />
      <div className="absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[16px] justify-center leading-[0] left-[35.55px] not-italic text-[#131619] text-[14px] top-[23.5px] translate-y-[-50%] w-[31.357px]">
        <p className="leading-[16px]">{` and `}</p>
      </div>
      <Link1 />
      <div className="absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[16px] justify-center leading-[0] left-[166.44px] not-italic text-[#131619] text-[14px] top-[23.5px] translate-y-[-50%] w-[40.954px]">
        <p className="leading-[16px]">{` apply.`}</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[16px] px-0 top-[306.5px]" data-name="Margin">
      <Container9 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f1f4f6] box-border content-stretch flex flex-col h-[40px] items-center justify-center pb-[12.5px] pt-[11.5px] px-[17px] relative rounded-[10px] shrink-0 w-[400px]" data-name="Button">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e7680] text-[16px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">Join</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[80px] items-start left-[-4px] pb-0 pt-[40px] px-0 top-[168.5px] w-[400px]" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[354.5px] relative shrink-0 w-[392px]" data-name="Container">
      <Margin4 />
      <Margin5 />
      <Margin6 />
      <Margin7 />
      <Margin8 />
      <ButtonMargin />
    </div>
  );
}

function Margin9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[20px] py-[30px] relative shrink-0 w-[432px]" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[920px]" data-name="Container">
      <Margin3 />
      <Margin9 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[720px] items-start justify-center left-[-9.5px] min-h-[414.5px] px-0 py-[152.75px] right-0 top-[calc(50%-28px)] translate-y-[-50%]" data-name="Margin">
      <Container11 />
    </div>
  );
}

function LinkPrivacyLegalPolicies() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Link - Privacy & Legal Policies">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#40a8fe] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">{`Privacy & Legal Policies`}</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="box-border content-stretch flex items-start justify-center pl-[8px] pr-0 py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e7680] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">|</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="box-border content-stretch flex items-center justify-center pl-[8px] pr-0 py-0 relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e7680] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Send Report</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e7680] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">{`© 2025 Zoom Communications, Inc. All rights reserved. `}</p>
      </div>
      <LinkPrivacyLegalPolicies />
      <Container12 />
      <Button2 />
    </div>
  );
}

function Margin11() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[117.94px] px-0 py-[16px] top-[720px]" data-name="Margin">
      <Container13 />
    </div>
  );
}

function Background1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full" data-name="Background">
      <Button />
      <Margin10 />
      <Margin11 />
    </div>
  );
}

export default function Component901WDefault() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative size-full" data-name="901w default">
      <Background1 />
    </div>
  );
}