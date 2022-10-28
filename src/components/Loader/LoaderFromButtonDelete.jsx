import { Watch } from 'react-loader-spinner';
export const LoaderFromButtonDelete = () => {
  return (
    <div>
      <Watch
        height="20"
        width="20"
        radius="48"
        color="#000"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
