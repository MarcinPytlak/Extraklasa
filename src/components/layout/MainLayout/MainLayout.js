import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';

const MainLayout = ({children}) => (
  <div>
    <main className={styles.container}>
      {children}
    </main>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;