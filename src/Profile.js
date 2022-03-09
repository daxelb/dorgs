class Profile {
  constructor(org = null) {
    this.org = org;
    this.element = document.getElementById('org-prof');
    this.updateKeyListener();
  }

  handleKeyInput = (e) => {
    if (e.key == 'ArrowUp' || e.key == 'w') {
      this.org.override = 'up';
    } else if (e.key == 'ArrowLeft' || e.key == 'a') {
      this.org.override = 'left';
    } else if (e.key == 'ArrowDown' || e.key == 's') {
      this.org.override = 'down';
    } else if (e.key == 'ArrowRight' || e.key == 'd') {
      this.org.override = 'right';
    }
    this.updateElement();
  };

  updateKeyListener() {
    if (this.org && this.org.beingWatched) {
      document.addEventListener('keydown', this.handleKeyInput);
    } else {
      $('#override').css('opacity', 1);
      document.removeEventListener('keydown', this.handleKeyInput);
    }
  }

  changeOrg(org) {
    if (this.org) this.org.beingWatched = false;
    if (org) org.beingWatched = true;
    this.org = org;
    this.updateKeyListener();
    this.updateElement();
  }

  on() {
    return !!this.org;
  }

  display() {
    if (this.on()) {
      $('#org-prof').animate({ height: '75vh', opacity: '1' }, 200).show();
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
    $('#x').html(this.org.c);
    $('#y').html(this.org.r);
    $('#lifetime').html(this.org.lifetime);
  }
}

export default Profile;
