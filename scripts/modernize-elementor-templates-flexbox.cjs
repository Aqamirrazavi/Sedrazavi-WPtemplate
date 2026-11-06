/**
 * Modernizes Elementor Template JSON files from legacy Section/Column
 * into modern Elementor 3.20+ Flexbox Containers.
 */
const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../elementor-addon-suite/templates');
const popupsDir = path.join(__dirname, '../elementor-addon-suite/templates/popups');

function transformElement(el) {
  if (el.elType === 'section') {
    const newSettings = Object.assign({}, el.settings || {});
    
    newSettings.content_width = (newSettings.layout === 'full_width') ? 'full' : 'boxed';
    delete newSettings.layout;

    if (!newSettings.flex_direction) {
      newSettings.flex_direction = 'column';
    }
    if (!newSettings.flex_align_items) {
      newSettings.flex_align_items = 'stretch';
    }
    if (!newSettings.flex_justify_content) {
      newSettings.flex_justify_content = 'center';
    }

    const columns = (el.elements || []).filter(sub => sub.elType === 'column');

    let transformedChildren = [];

    if (columns.length === 1) {
      const col = columns[0];
      const colChildren = col.elements || [];
      transformedChildren = colChildren.map(c => transformElement(c));
    } else if (columns.length > 1) {
      newSettings.flex_direction = 'row';
      newSettings.flex_wrap = 'wrap';
      newSettings.flex_gap = newSettings.flex_gap || { unit: 'px', size: 24 };

      transformedChildren = columns.map((col, idx) => {
        const colSize = col.settings && col.settings._column_size ? Number(col.settings._column_size) : Math.round(100 / columns.length);
        const childContainer = {
          id: (col.id || `uas_col_${idx}`).replace('uas_col_', 'uas_cnt_sub_'),
          elType: 'container',
          isInner: true,
          settings: Object.assign({}, col.settings || {}, {
            width: { unit: '%', size: colSize },
            flex_direction: 'column',
            flex_align_items: 'stretch'
          }),
          elements: (col.elements || []).map(c => transformElement(c))
        };
        delete childContainer.settings._column_size;
        return childContainer;
      });
    } else {
      transformedChildren = (el.elements || []).map(c => transformElement(c));
    }

    return {
      id: (el.id || 'uas_sec').replace('uas_sec_', 'uas_cnt_'),
      elType: 'container',
      isInner: false,
      settings: newSettings,
      elements: transformedChildren
    };
  }

  if (el.elType === 'column') {
    const colSize = el.settings && el.settings._column_size ? Number(el.settings._column_size) : 100;
    const colSettings = Object.assign({}, el.settings || {}, {
      width: { unit: '%', size: colSize },
      flex_direction: 'column'
    });
    delete colSettings._column_size;
    return {
      id: (el.id || 'uas_col').replace('uas_col_', 'uas_cnt_'),
      elType: 'container',
      isInner: true,
      settings: colSettings,
      elements: (el.elements || []).map(c => transformElement(c))
    };
  }

  return el;
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (content.type === 'section') {
      content.type = 'container';
    }

    if (Array.isArray(content.content)) {
      content.content = content.content.map(el => transformElement(el));
    }

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`✅ Modernized to Flexbox Container: ${file}`);
  });
}

console.log('Modernizing all Elementor templates to Elementor 3.20+ Flexbox Containers...');
processDirectory(templatesDir);
processDirectory(popupsDir);
console.log('🎉 All Elementor templates successfully upgraded to Flexbox Containers!');
