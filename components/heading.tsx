"use client";
interface HeadingPeops {
  title: string;
  subtitle?: string;
  center?: boolean;
}
const Heading = ({ title, subtitle, center }: HeadingPeops) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-2 font-light text-gray-600">{subtitle}</div>
    </div>
  );
};

export default Heading;
