import { motion } from "framer-motion";

import { styles } from "../styles";
import { download, githubLink, instagram, linkedin, resume } from "../assets";
import { Tilt } from "react-tilt";
import PropTypes from "prop-types";

const SocialIcon = ({ icon, gradientClass, altText, linkClass, mediaLink }) => (
  <Tilt>
    <div
      className={`rounded-full w-10 h-10 cursor-${linkClass} gradient ${gradientClass} p-[1.5px] cursor-${linkClass}`}>
      <div
        className={`w-full h-full rounded-full flex items-center justify-center cursor-${linkClass}`}>
        <a
          target="_blank"
          rel="noreferrer"
          href={mediaLink}
          className={`flex items-center justify-center cursor-${linkClass}`}>
          <img
            className={`w-3/4 h-3/4 object-contain cursor-${linkClass}`}
            alt={altText}
            src={icon}
          />
        </a>
      </div>
    </div>
  </Tilt>
);

SocialIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  gradientClass: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  linkClass: PropTypes.string.isRequired,
  mediaLink: PropTypes.string.isRequired,
};

const Hero = () => {
  const socialData = [
    {
      icon: instagram,
      gradientClass: "instagram-gradient",
      altText: "Instagram",
      linkClass: "instagram",
      mediaLink: "https://www.instagram.com/arnabghosssh/",
    },
    {
      icon: linkedin,
      gradientClass: "linkedin-gradient",
      altText: "LinkedIn",
      linkClass: "linkedin",
      mediaLink: "https://www.linkedin.com/in/arnab-ghosh-828210283/",
    },
    {
      icon: githubLink,
      gradientClass: "github-gradient",
      altText: "GitHub",
      linkClass: "github",
      mediaLink: "https://github.com/RonnieArnab",
    },
  ];

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi , I&apos;m <span className="text-[#915eff]">Arnab</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am full stack devloper and <br className="sm:block hidden" />{" "}
            fultter app developer
          </p>
          <div className="flex flex-row flex-wrap gap-5 my-5">
            <div className="flex space-x-4">
              {socialData.map((data, index) => (
                <SocialIcon key={index} {...data} />
              ))}
            </div>
            <Tilt>
              <a
                download
                href={resume}
                className="download-button w-40 h-10 rounded-2xl flex flex-row gap-3 justify-center items-center cursor-pointer">
                <div className="flex items-center justify-center">
                  Download CV
                </div>
                <div className="flex items-center justify-center">
                  <img
                    alt="download"
                    className="w-3/4 h-3/4 object-contain"
                    src={download}
                  />
                </div>
              </a>
            </Tilt>
          </div>
        </div>
      </div>

      {/* <ComputersCanvas /> */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[30px] h-[55px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 ">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
