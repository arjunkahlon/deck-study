import React from 'react';

const styles = {
  page: {
    minHeight: 'calc(100vh - 3.5rem)'
  }
};

export default function PageContainer({ children }) {
  return (
    <div className="background-grey">
      <div className='pt-5'>
        <div className="page-container pt-3" style={styles.page}>
          {children}
        </div>
      </div>
    </div>
  );
}
