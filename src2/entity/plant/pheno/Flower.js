class Flower {
    constructor(dorg = null) {
        this.dorg = dorg;
        this.canvas = document.getElementById('flower').getElementsByTagName('canvas');
        this.updateKeyListener();
        this.edit = false;
    }

    handleKeyInput = (e) => {
        if (e.key == 'ArrowUp' || e.key == 'w') {
            this.dorg.override = 'up';
        } else if (e.key == 'ArrowLeft' || e.key == 'a') {
            this.dorg.override = 'left';
        } else if (e.key == 'ArrowDown' || e.key == 's') {
            this.dorg.override = 'down';
        } else if (e.key == 'ArrowRight' || e.key == 'd') {
            this.dorg.override = 'right';
        }
        this.updateElement();
    };

    updateKeyListener() {
        if (this.dorg && this.dorg.beingWatched) {
            document.addEventListener('keydown', this.handleKeyInput);
        } else {
            $('#override').css('opacity', 1);
            document.removeEventListener('keydown', this.handleKeyInput);
        }
    }

    changeDorg(dorg) {
        if (this.dorg) this.dorg.beingWatched = false;
        if (dorg) dorg.beingWatched = true;
        this.dorg = dorg;
        this.updateKeyListener();
        this.updateElement();
    }

    on() {
        return !!this.dorg;
    }

    display() {
        if (this.on()) {
            $('#dorg-prof').animate({ height: '75vh', opacity: '1' }, 200).show();
        } else {
            this.element.style.display = 'none';
            this.element.style.height = '0vh';
            this.element.style.opacity = '0';
        }
    }

    updateElement() {
        if (!this.on()) {
            return;
        }
        $('#x').html(this.dorg.c);
        $('#y').html(this.dorg.r);
        $('#lifetime').html(this.dorg.lifetime);
    }
}

export default Profile;
