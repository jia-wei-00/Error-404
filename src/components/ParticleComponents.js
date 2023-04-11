
import Particles from "react-tsparticles";
import {loadBigCirclesPreset} from 'tsparticles-preset-big-circles';



const ParticleComponent = () => {


    const initAnimation = async (engine) => {
        await loadBigCirclesPreset(engine);
      }


  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#e6e6e6",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        zIndex:-1,
      }}
    >
      <Particles
        style={{ position: "absolute", top: 0 }}
        // params={particlesConfig}
        options={{
            preset: 'bigCircles',
            particles: {
              color: ["#325358","#C0FFEE","#31CCEC","#6A1A78"],
            },
            resize: {
              "delay": 0.5,
              "enable": true
            }
        }}
        init={loadBigCirclesPreset}
      />
    </div>
  );
};

export default ParticleComponent;
