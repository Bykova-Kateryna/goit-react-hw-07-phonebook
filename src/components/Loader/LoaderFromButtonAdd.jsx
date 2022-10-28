import { ProgressBar } from 'react-loader-spinner';
export const LoaderFromButtonAdd = () => {
  return (
    <div>
      <p>add contact...</p>
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#000"
        barColor="#51E5FF"
      />
    </div>
  );
};
