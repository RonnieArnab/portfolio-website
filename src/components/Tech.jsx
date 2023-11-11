import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="pb-5">
        <p className={`${styles.sectionSubText}`}>What I know so far</p>
        <h2 className={`${styles.sectionHeadText}`}>My Skills</h2>
      </motion.div>
      <div className="flex flex-row w-full flex-wrap justify-center gap-3">
        {technologies.map((technology) => {
          return (
            <div className="" key={technology.name}>
              <div className="w-full green-pink-gradient p-[1px] rounded-[10px] shadow-card">
                <div className="bg-tertiary rounded-[10px] py-2.5 px-5 min-h-[32px] flex justify-between items-center flex-col">
                  <h3 className="text-white text-[20px] font-bold text-center">
                    {technology.name}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
