const icons = {
    plane: {
        default: {
            q0Deg: {
                icon: 'https://i.ibb.co/fnsyXfy/plane0deg.png',
            },
            q1Deg: {
                icon: 'https://i.ibb.co/w0fTVwB/plane15deg.png',
            },
            q2Deg: {
                icon: 'https://i.ibb.co/YNkrZDT/plane30deg.png',
            },
            q3Deg: {
                icon: 'https://i.ibb.co/7YnkcD8/plane45deg.png',
            },
            q4Deg: {
                icon: 'https://i.ibb.co/Xz7PvzM/plane60deg.png',
            },
            q5Deg: {
                icon: 'https://i.ibb.co/F4N0h2b/plane75deg.png',
            },
            q6Deg: {
                icon: 'https://i.ibb.co/86bjLjZ/plane90deg.png',
            },
            q7Deg: {
                icon: 'https://i.ibb.co/V2Bxw59/plane105deg.png',
            },
            q8Deg: {
                icon: 'https://i.ibb.co/68cJm6D/plane120deg.png',
            },
            q9Deg: {
                icon: 'https://i.ibb.co/8MTwQ7t/plane135deg.png',
            },
            q10Deg: {
                icon: 'https://i.ibb.co/y8gfRjD/plane150deg.png',
            },
            q11Deg: {
                icon: 'https://i.ibb.co/XYBVkPm/plane165deg.png',
            },
            q12Deg: {
                icon: 'https://i.ibb.co/k5MF03G/plane180deg.png',
            },
            q13Deg: {
                icon: 'https://i.ibb.co/5FB5Kh3/plane195deg.png',
            },
            q14Deg: {
                icon: 'https://i.ibb.co/6y28WLT/plane210deg.png',
            },
            q15Deg: {
                icon: 'https://i.ibb.co/WWJkgQg/plane225deg.png',
            },
            q16Deg: {
                icon: 'https://i.ibb.co/2F8VL76/plane240deg.png',
            },
            q17Deg: {
                icon: 'https://i.ibb.co/JxFmMm9/plane255deg.png',
            },
            q18Deg: {
                icon: 'https://i.ibb.co/ZK3QT44/plane270deg.png',
            },
            q19Deg: {
                icon: 'https://i.ibb.co/vZWfbrv/plane285deg.png',
            },
            q20Deg: {
                icon: 'https://i.ibb.co/5BLTWxs/plane300deg.png',
            },
            q21Deg: {
                icon: 'https://i.ibb.co/ssHKc6S/plane315deg.png',
            },
            q22Deg: {
                icon: 'https://i.ibb.co/HFYNV97/plane330deg.png',
            },
            q23Deg: {
                icon: 'https://i.ibb.co/VCWcsGY/plane345deg.png',
            },
        },
        hover: {

        }
    },
    helicopter: {
        icon: 'https://fobwayweb.com/wp-content/uploads/2013/10/plane.png',
    }
};

export const iconManager = {
    getIconOrientedUrl(angle){
        var selectedIcon;
        if (angle >= 0 && angle < 15){
            selectedIcon = icons['plane'].default.q0Deg.icon;
        }else if(angle >= 15 && angle < 30){
            selectedIcon = icons['plane'].default.q1Deg.icon;
        }else if(angle >= 30 && angle < 45){
            selectedIcon = icons['plane'].default.q2Deg.icon;
        }else if(angle >= 45 && angle < 60){
            selectedIcon = icons['plane'].default.q3Deg.icon;
        }else if(angle >= 60 && angle < 75){
            selectedIcon = icons['plane'].default.q4Deg.icon;
        }else if(angle >= 75 && angle < 90){
            selectedIcon = icons['plane'].default.q5Deg.icon;
        }else if(angle >= 90 && angle < 105){
            selectedIcon = icons['plane'].default.q6Deg.icon;
        }else if(angle >= 105 && angle < 120){
            selectedIcon = icons['plane'].default.q7Deg.icon;
        }else if(angle >= 120 && angle < 135){
            selectedIcon = icons['plane'].default.q8Deg.icon;
        }else if(angle >= 135 && angle < 150){
            selectedIcon = icons['plane'].default.q9Deg.icon;
        }else if(angle >= 150 && angle < 165){
            selectedIcon = icons['plane'].default.q10Deg.icon;
        }else if(angle >= 165 && angle < 180){
            selectedIcon = icons['plane'].default.q11Deg.icon;
        }else if(angle >= 180 && angle < 195){
            selectedIcon = icons['plane'].default.q12Deg.icon;
        }else if(angle >= 195 && angle < 210){
            selectedIcon = icons['plane'].default.q13Deg.icon;
        }else if(angle >= 210 && angle < 225){
            selectedIcon = icons['plane'].default.q14Deg.icon;
        }else if(angle >= 225 && angle < 240){
            selectedIcon = icons['plane'].default.q15Deg.icon;
        }else if(angle >= 240 && angle < 255){
            selectedIcon = icons['plane'].default.q16Deg.icon;
        }else if(angle >= 255 && angle < 270){
            selectedIcon = icons['plane'].default.q17Deg.icon;
        }else if(angle >= 270 && angle < 285){
            selectedIcon = icons['plane'].default.q18Deg.icon;
        }else if(angle >= 285 && angle < 300){
            selectedIcon = icons['plane'].default.q19Deg.icon;
        }else if(angle >= 300 && angle < 315){
            selectedIcon = icons['plane'].default.q20Deg.icon;
        }else if(angle >= 315 && angle < 330){
            selectedIcon = icons['plane'].default.q21Deg.icon;
        }else if(angle >= 330 && angle < 345){
            selectedIcon = icons['plane'].default.q22Deg.icon;
        }else if(angle >= 345 && angle < 360){
            selectedIcon = icons['plane'].default.q23Deg.icon;
        }else{
            selectedIcon = icons['plane'].default.q0Deg.icon;
        }
        return selectedIcon;
    }
}