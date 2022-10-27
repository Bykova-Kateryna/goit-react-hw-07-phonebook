import { MagnifyingGlass } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <div>
      <MagnifyingGlass
        visible={true}
        height="40"
        width="40"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#000"
      />
    </div>
  );
};
