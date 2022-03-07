class Profile {
  constructor(org = null) {
    this.org = org;
    this.element = document.getElementById('org-prof');
  }

  changeOrg(org) {
    this.org = org;
    this.updateElement();
  }

  on() {
    return !!this.org;
  }

  display() {
    this.element.style.display = this.on() ? 'flex' : 'none';
  }

  updateElement() {
    if (!this.on()) {
      return;
    }
    this.element.children['org-pos'].innerHTML = `(${this.org.c},${this.org.r})`;
    // this.element.children['org-pos'];
    // this.element.children['#org-name'] = this.org.name;
  }
}

export default Profile;
