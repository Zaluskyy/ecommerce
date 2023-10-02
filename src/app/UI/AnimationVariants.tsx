const duration = .2

export const appearNavbar = {
    hidden: {
        left: "-100%",
        // opacity: 0,
    },
    visible: {
        left: 0,
        // opacity: 1,
        transition: {duration: duration},
        
    },
    exit: {
        transition: {duration: duration},
        left: "-100%",
        // opacity: 0,

    }
}
export const slideSearchInput = {
    hidden: {
        top: '-100%',
        // opacity: 0,
    },
    visible: {
        top: 32.5,
        // opacity: 1,
        transition: {duration: duration},
        
    },
    exit: {
        transition: {duration: duration},
        top: '-100%',
        // opacity: 0,

    }
}

export const popUpDesktopAnimation = {
    hidden: {
        scale: 0,
        x: '-50%',
        y: '-50%',
        opacity: 0
    },
    visible: {
        scale: 1,
        x: '-50%',
        y: '-50%',
        opacity: 1
    },
    exit: {
        scale: 0,
        x: '-50%',
        y: '-50%',
        opacity: 0
    }
}
export const popUpMobileAnimation = {
    hidden: {
        scale: 0,
        x: 0,
        y: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1
    },
    exit: {
        scale: 0,
        x: 0,
        y: 0,
        opacity: 0
    }
}
