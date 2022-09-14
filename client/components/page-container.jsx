import React from 'react';

const styles = {
  page: {
    minHeight: 'calc(100vh - 3.5rem)'
  }
};

export default function PageContainer({ children }) {
  return (
    <div className="background-grey">
      <div className="page-container" style={styles.page}>
        {children}
      </div>
    </div>
  );
}
