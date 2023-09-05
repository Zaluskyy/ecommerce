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