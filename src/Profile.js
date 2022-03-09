class Profile {
  constructor(org = null) {
    this.org = org;
    this.element = document.getElementById('org-prof');
    $('#override').click((e) => {
      this.org.override = !this.org.override;
      $('#override').css('opacity', this.org.override ? '0.6' : '1');
      this.updateKeyListener();
    });
  }

  handleKeyInput = (e) => {
    if (e.key == 'ArrowUp' || e.key == 'w') {
      this.org.move('up');
    } else if (e.key == 'ArrowLeft' || e.key == 'a') {
      this.org.move('left');
    } else if (e.key == 'ArrowDown' || e.key == 's') {
      this.org.move('down');
    } else if (e.key == 'ArrowRight' || e.key == 'd') {
      this.org.move('right');
    }
  };

  updateKeyListener() {
    if (this.org && this.org.override) {
      document.addEventListener('keydown', this.handleKeyInput);
    } else {
      $('#override').css('opacity', 1);
      document.removeEventListener('keydown', this.handleKeyInput);
    }
  }

  changeOrg(org) {
    if (!org && this.org) this.org.override = false;
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
  }
}

export default Profile;
