const Loading = () => {
  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-background"
      role="status"
      aria-label="Loading"
    >
      <div className="relative w-full max-w-[350px] md:max-w-[450px] aspect-square">
        <img
          src="/assets/loader.gif"
          className="w-full h-full object-contain"
          alt="Loading indicator"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Loading;
