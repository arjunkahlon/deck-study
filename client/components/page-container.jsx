import React from 'react';

const styles = {
  page: {
    minHeight: 'calc(100vh - 3.5rem)'
  }
};

export default function PageContainer({ children }) {
  return (
    <div className="bg-light">
      <div className="container" style={styles.page}>
        {children}
      </div>
    </div>
  );
}
