import json

with open('/home/fernando-godinho/ecommerce/parsed_products.json', 'r') as f:
    products = json.load(f)

for p in products:
    title = p['title'].lower()
    desc = p['description'].lower()
    
    # Categorization logic
    if 'macacão' in title or 'macacao' in title:
        p['category'] = 'Macacões'
    elif 'conjunto' in title or 'top' in title or 'bicolor' in title or 'white black' in title:
        p['category'] = 'Conjuntos'
    elif 'corta vento' in title or 'casaco' in title or 'jaqueta' in title:
        p['category'] = 'Casacos'
    else:
        p['category'] = 'Conjuntos' # Default category for activewear sets

# Output products.js
js_content = f"const PRODUCTS = {json.dumps(products, indent=2, ensure_ascii=False)};"

with open('/home/fernando-godinho/ecommerce/products.js', 'w') as out:
    out.write(js_content)

print(f"Generated products.js with {len(products)} products.")
