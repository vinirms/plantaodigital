import React, { useState } from 'react'

const Tooltip = ({ text, children,position = 'top'  }) => {

const [visible, setVisible] = useState(false);
const styles = {
    wrapper: { position: 'relative', display: 'inline-block' },
    box: {
      position: 'absolute',
      bottom: position === 'top' ? 'calc(100% + 8px)' : 'auto',
      top: position === 'bottom' ? 'calc(100% + 8px)' : 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1e1e2e',
      color: '#ffffff',
      fontSize: '12px',
      padding: '6px 10px',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: 10,
    }
  };

  return (
    <div
      style={styles.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={styles.box}>{text}</div>
      )}
    </div>
  )
}

export default Tooltip