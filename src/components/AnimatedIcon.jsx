import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function AnimatedIcon({ src, size = 80 }) {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <DotLottieReact
                src={src}
                autoplay
                loop
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
            
        </div>
    );
}

export default AnimatedIcon;