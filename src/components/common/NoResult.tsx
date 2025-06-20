const NoResult = () => {
  return (
    <div className="[height:calc(100vh_-_200px)] flex justify-center items-center flex-col">
      <img src="/assets/teamRocket.png" className="mb-3 w-150 h-auto" />
      <h1 className="text-3xl text-secondary font-regular mb-4">
        The rocket team has won this time.
      </h1>
    </div>
  );
};

export default NoResult;
