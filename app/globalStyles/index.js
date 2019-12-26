
// fade In
export const fadeInKeyframes = {
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
}

export const fadeInAnim = {
  animationName: '$fadeIn',
  animationDuration: 300,
}

// bounce In
export const bounceInKeyframes = {
  '@keyframes bounceIn': {
    from: { marginTop: '100vh', },
    to: { marginTop: 10, }
  },
}

export const bounceInAnim = {
  animationName: '$bounceIn',
  animationDuration: 400,
}
