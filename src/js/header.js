const menuItems = {
  demos: {
    label: 'Demos',
    items: [
      {
        label: 'Item 1',
        url: '#',
      },
      {
        label: 'Item 2',
        url: '#',
      },
    ],
  },
  posts: {
    label: 'Posts',
    items: [
      {
        label: 'Itemfgd d 1',
        url: '#',
      },
      {
        label: 'Item gfhf 2',
        url: '#',
      },
    ],
  },
  features: {
    label: 'Features',
    items: [
      {
        label: 'Item 1',
        url: '#',
      },
      {
        label: 'Other items',
        url: '#',
      },
    ],
  },
  categories: {
    label: 'Categories',
    items: [
      {
        label: 'Item 1',
        url: '#',
      },
      {
        label: 'Item 2',
        url: '#',
      },
      {
        label: 'Other items',
        url: '#',
      },
    ],
  },
  shop: {
    label: 'Shop',
    items: [
      {
        label: 'Item 1',
        url: '#',
      },
      {
        label: 'Item 2',
        url: '#',
      },
      {
        label: 'Other items',
        url: '#',
      },
    ],
  },
  buyNow: {
    label: 'Buy Now',
    url: '#',
  },
};

let oldScrollY = window.scrollY;
function handleNavigation() {
  const header = document.querySelector('header');
  if (window.scrollY > 200) {
    if (oldScrollY < window.scrollY) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
  }

  oldScrollY = window.scrollY;
}
window.addEventListener('scroll', handleNavigation);

// menu logic
const nav = document.querySelector('header nav .main_menu');

for (let [_, menu] of Object.entries(menuItems)) {
  const elements = [];
  const node = document.createElement('li');

  if (menu.url !== undefined) {
    let childNode = document.createElement('a');
    childNode.innerText = menu.label;
    childNode.href = menu.url;
    node.appendChild(childNode);
  } else {
    node.innerText = menu.label;
  }
  if (menu?.items?.length) {
    node.classList.add('has_menu');
    const subMenuNode = document.createElement('ul');
    // subMenuNode.classList.add('sub_menu');
    for (let subMenuItem of menu?.items) {
      const subMenuItemNode = document.createElement('li');
      const linkNode = document.createElement('a');
      linkNode.innerText = subMenuItem.label;
      linkNode.href = subMenuItem.url;
      subMenuItemNode.appendChild(linkNode);
      subMenuNode.appendChild(subMenuItemNode);
    }
    node.appendChild(subMenuNode);
  }

  node.addEventListener('click', () => {
    node.classList.toggle('opened');
  });

  elements.push(node);
  nav.appendChild(...elements);
}

const openButton = document.querySelector('.open_menu');

openButton.addEventListener('click', () => {
  const menuNode = document.querySelector('.row_2');
  menuNode.classList.add('opened');
});
const closeButton = document.querySelector('.mobile_menu_header .open_menu');

closeButton.addEventListener('click', () => {
  const menuNode = document.querySelector('.row_2');
  menuNode.classList.remove('opened');
});
