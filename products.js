const PRODUCTS = [
  {
    "title": "Macacão Julia",
    "price": "R$ 219,90",
    "description": "Costas abertas, bicolo, PERFEITO! \nSeu treino merece esse destaque! 💅\nMacacão canelado com compressão, caimento impecável e muito conforto. Veste até 42.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F05w2jJu0JSQy4lo181Ke%2FNormal-17787181614180.jpg?alt=media&token=ed3d729276f21d77d8cd5fae95b261cf",
    "id": "05w2jJu0JSQy4lo181Ke",
    "category": "Macacões"
  },
  {
    "title": "Macação Poliamida",
    "price": "R$ 219,90",
    "description": "MACACÃO POLIAMIDA CURTO COM DEDINHO E COSTAS ABERTAS\n\nConfortável, estiloso e daqueles que veste MUITO bem ✨\nFeito em poliamida com toque macio e caimento que acompanha o corpo sem apertar. O dedinho deixa o look mais moderno e as costas abertas trazem aquele detalhe que faz toda diferença 🤍",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F1l3HoCYg5ZGycpv5wvhu%2FNormal-17826476742260.jpg?alt=media&token=4fc1dbed5234d739d5be5e384c524f25",
    "id": "1l3HoCYg5ZGycpv5wvhu",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto preto top Mari canelado de compressão",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F1nSLjTTpv3vk22ij9D3m%2F17794684787880.jpg?alt=media&token=c4626db6-271c-4b12-b1f5-1164735fd600",
    "id": "1nSLjTTpv3vk22ij9D3m",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto White Black",
    "price": "R$ 199,00",
    "description": "WHITE BLACK 🤍🖤\n\nPra quem gosta do básico… mas gosta ainda mais de sair do comum ✨\nO contraste do branco com preto traz um visual moderno, elegante e com aquele toque de ousadia que transforma o look.\n\nNosso canelado de compressão entrega conforto, sustentação e um caimento que valoriza sem abrir mão da leveza. Porque o clássico também pode ter personalidade.\n\nDisponível nos tamanhos M e G.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F2HvUPPi8KArlUqsVejTC%2FNormal-17826489854360.jpg?alt=media&token=ab7134fbb4e1fea7f5086fd73b39b60f",
    "id": "2HvUPPi8KArlUqsVejTC",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto Canelado de Compressao",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F2isgsJswKET0VNn0Tfkq%2F17787176945880.jpg?alt=media&token=f2212fd8-6f85-46e8-9b79-7039869abf3c",
    "id": "2isgsJswKET0VNn0Tfkq",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto canelado de compressão",
    "price": "R$ 189,00",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F2m4TBGFnLJI4zSgkfxqz%2F17787176392370.jpg?alt=media&token=d01d734a-d95e-4261-acb7-b2819b6f9d49",
    "id": "2m4TBGFnLJI4zSgkfxqz",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto Zara",
    "price": "R$ 219,00",
    "description": "CONJUNTO POLIAMIDA TOP ZARA\nVisual clean, tecido leve e qualidade que aparece no vestir. A poliamida abraça sem marcar e deixa tudo mais confortável ✨",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F5FqMF4gjg6lBB8q2QQnU%2FNormal-17826475655770.jpg?alt=media&token=feb8835248243190889bb613337fe5b1",
    "id": "5FqMF4gjg6lBB8q2QQnU",
    "category": "Conjuntos"
  },
  {
    "title": "Macacão bicolor",
    "price": "R$ 219,90",
    "description": "Canelado de compressão",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F6HyaSaVtjOsxTHI5QFf8%2F17794685987970.jpg?alt=media&token=a5265d1f-6c58-4d78-b5db-eb953e7bc0c9",
    "id": "6HyaSaVtjOsxTHI5QFf8",
    "category": "Macacões"
  },
  {
    "title": "Bicolor açaí",
    "price": "R$ 199,00",
    "description": "Tecido canelado que abraça o corpo, compressão que sustenta e um visual que foge do básico 🤍 Confortável pra usar, lindo pra olhar.\n\nM, G",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F6PrEcYJB9IjsixFvYc1k%2FNormal-17826484926760.jpg?alt=media&token=a210006ea43df549e336d8ea90b89240",
    "id": "6PrEcYJB9IjsixFvYc1k",
    "category": "Conjuntos"
  },
  {
    "title": "Corta Vento",
    "price": "R$ 169,00",
    "description": "Pra quem ama um look esportivo sem abrir mão do conforto ✨\nLeve, prática e com acabamento que faz diferença. Daqueles casacos que você coloca e não quer mais tirar.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F8PiNADqznrFpzp5QP16G%2FNormal-17826503313850.jpg?alt=media&token=47afcde03478f52e3759c28a56433d85",
    "id": "8PiNADqznrFpzp5QP16G",
    "category": "Casacos"
  },
  {
    "title": "Macacão Julia",
    "price": "R$ 219,90",
    "description": "Macacão Fitness Canelado Roxo 💜\nCompressão na medida certa para valorizar suas curvas e garantir conforto nos treinos. Veste até o manequim 42.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F9dwPwtgdjprnJ4Vw66Ne%2FNormal-17787181331260.jpg?alt=media&token=6f605f1b12c5f01b8c2d8e4145ea365f",
    "id": "9dwPwtgdjprnJ4Vw66Ne",
    "category": "Macacões"
  },
  {
    "title": "Conjunto canelado de compressão",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2F9ocMgD61X8JvGBhvh4rV%2F17787175871930.jpg?alt=media&token=cb738be4-2828-49a1-ba25-15f1482f8484",
    "id": "9ocMgD61X8JvGBhvh4rV",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto Flare",
    "price": "R$ 219,90",
    "description": "CONJUNTO FLARE POLIAMIDA + BLUSA DEDINHO EM SUPLEX\n\nConforto com cara de look arrumado 🤍\nA poliamida entrega aquele toque macio e caimento impecável, enquanto o suplex traz estrutura e segurança. Resultado: lindo no corpo e gostoso de usar.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FAFyqaYviSg77TyjDHJzf%2FNormal-17826474944710.jpg?alt=media&token=84cfe7954668aed0d007b494726848bc",
    "id": "AFyqaYviSg77TyjDHJzf",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto Van Gogh",
    "price": "R$ 199,00",
    "description": "VAN GOGH 🎨✨\n\nUm conjunto pra quem ama conforto, mas presta atenção nos detalhes 🤍\nO bicolor traz personalidade pro look e o detalhe nas costas é aquele toque que muda tudo — moderno, diferente e cheio de estilo.\n\nModelagem que veste super bem, tecido confortável e um caimento que valoriza sem perder a leveza. Porque às vezes é nas costas que o look rouba a cena.\n\nDisponível nos tamanhos M e G.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FC7hLhrX70kxgDmSoqiJ1%2FNormal-17826490914970.jpg?alt=media&token=6dd765da1fed4f850ceaed31122d215d",
    "id": "C7hLhrX70kxgDmSoqiJ1",
    "category": "Conjuntos"
  },
  {
    "title": "Corta Vento",
    "price": "R$ 169,90",
    "description": "JAQUETA CORTA VENTO SALMÃO 🩷✨\n\nPra quem ama unir conforto com um look cheio de estilo.\nLeve, prática e perfeita pra completar qualquer produção do treino à correria do dia. O tom salmão traz delicadeza e personalidade na medida certa, enquanto o acabamento e o caimento fazem toda diferença.\n\nDaquelas jaquetas que entram no look… e não saem mais da rotina.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FCc2dOLS7L0sFXfZQrCvr%2FNormal-17826503568680.jpg?alt=media&token=a763bf3a6aca6991930058c16b83ee23",
    "id": "Cc2dOLS7L0sFXfZQrCvr",
    "category": "Casacos"
  },
  {
    "title": "Conjunto RUN coffe",
    "price": "R$ 179,90",
    "description": "RUN COFFEE ☕✨\n\nO conjunto que te acompanha do treino ao café depois dele.\n\nCom short com bolso e alta sustentação, ele entrega conforto, segurança e praticidade em cada movimento. O tecido tem excelente qualidade, veste muito bem e garante aquele caimento que valoriza sem apertar.\n\nEstilo esportivo com vibe leve e pronta pra rotina real 💖",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FD4y2EdRskw05YBeDLYH0%2FNormal-17826521299370.jpg?alt=media&token=e2493d7487e6480ab67c601913d77201",
    "id": "D4y2EdRskw05YBeDLYH0",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto preto top Julia canelado de compressão",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FExvIPi5LNOJpcXjdToOB%2F17794685580160.jpg?alt=media&token=482ab001-78df-474c-8d21-db0e04610a55",
    "id": "ExvIPi5LNOJpcXjdToOB",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto Areia",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FFIIfI27kPiGLqvrXuEMP%2FNormal-17787170811960.jpg?alt=media&token=fc3b60588da61b6eab5f2db5cf350f43",
    "id": "FIIfI27kPiGLqvrXuEMP",
    "category": "Conjuntos"
  },
  {
    "title": "Bicolor Black White",
    "price": "R$ 199,00",
    "description": "BLACK & WHITE 🖤🤍\n\nO básico… só que nada óbvio ✨\nNosso canelado bicolor chegou pra quem ama conforto, mas não abre mão de um look com personalidade. A combinação preto e branco traz aquela ousadia na medida certa — elegante, moderna e longe do tradicional.\n\nTecido canelado com compressão confortável, modelagem que veste super bem e um visual que faz presença sem esforço.\n\nDisponível nos tamanhos M e G.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FFeltriPylj1y9ziwRsKp%2FNormal-17826487671040.jpg?alt=media&token=36fa04f7e3e8cb371410687a3f44951d",
    "id": "FeltriPylj1y9ziwRsKp",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto bicolor",
    "price": "R$ 189,90",
    "description": "O bicolor perfeito para quem gosta de um visual moderno e cheio de personalidade. \nCanelado de compressão, tamanho unico.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FGFZuc4unVyasQ4e08urP%2FNormal-17787174589350.jpg?alt=media&token=e1a3cf8ad939777f1114c24784d16cc2",
    "id": "GFZuc4unVyasQ4e08urP",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto Bicolor Coffe",
    "price": "R$ 199,00",
    "description": "Conjunto canelado de compressão bicolor: aquele equilíbrio perfeito entre estilo e conforto 🤍\n    Modela sem limitar, veste super bem e ainda entrega um visual moderno que chama atenção nos detalhes.\nTam: M e G",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FIvVILeimszyJU08iYun9%2FNormal-17826481939300.jpg?alt=media&token=29fd7b69eae0ca20d2496cdb9773730f",
    "id": "IvVILeimszyJU08iYun9",
    "category": "Conjuntos"
  },
  {
    "title": "Macacão Suzana",
    "price": "R$ 219,90",
    "description": "O preto que nunca sai de moda, elegante, versátil e perfeito para qualquer ocasião.\nSuper confortavel, alta sustenção! \nCanelado de compressão. \nTamanho unico.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FNJfgyGnLwhjlW1Gb4xkR%2FNormal-17803132604110.jpg?alt=media&token=6f9da251e200dcd15c7edf157180e833",
    "id": "NJfgyGnLwhjlW1Gb4xkR",
    "category": "Macacões"
  },
  {
    "title": "Macacão Natalia",
    "price": "R$ 219,90",
    "description": "Macacão canelado de compressão",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FO4fSIlKdkSd2FVVL5oeF%2F17795597018230.jpg?alt=media&token=69521d0d-64eb-4603-9d2c-c4c044bfb569",
    "id": "O4fSIlKdkSd2FVVL5oeF",
    "category": "Macacões"
  },
  {
    "title": "Macacão Day",
    "price": "R$ 219,90",
    "description": "O preto de sempre, mas com o caimento que faz toda a diferença. 🖤\nBolso na lateral. Tecido MEGA confortavel. \nCanelado de compressão\nVeste até 42",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FPq9pjW8AbTZO28lwLVSu%2FNormal-17795598622460.jpg?alt=media&token=4820aa91690f61dc4d094bfd897da515",
    "id": "Pq9pjW8AbTZO28lwLVSu",
    "category": "Macacões"
  },
  {
    "title": "Bicolor Cherry",
    "price": "R$ 199,00",
    "description": "O tipo de look que faz você se sentir arrumada sem esforço ✨\n    Tecido canelado com compressão na medida certa, sustentação confortável e combinação bicolor que deixa tudo mais estiloso.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FQZIWThRYSt7029gfxrWe%2FNormal-17826483470670.jpg?alt=media&token=0cde07d5068581e8ebe06c68b971641e",
    "id": "QZIWThRYSt7029gfxrWe",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto preto top Iza canelado de compressão",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FR72WIaoAvoVkta4USIfL%2F17794685232570.jpg?alt=media&token=b0fa9057-23b6-4fee-a0c4-fb75b5fbea97",
    "id": "R72WIaoAvoVkta4USIfL",
    "category": "Conjuntos"
  },
  {
    "title": "Jaqueta dedinho",
    "price": "R$ 129,90",
    "description": "JAQUETA DE DEDINHO EM POLIAMIDA\n\nAquela terceira peça que muda o look 🤍\nPoliamida com toque geladinho, super confortável e um caimento que veste lindo no corpo. Leve, estilosa e perfeita pra acompanhar do treino ao dia a dia. 🥰",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FSTbqive8UWQJz3SxeCbu%2FNormal-17826502861950.jpg?alt=media&token=098df7b7131ea75d82285bbf5f703303",
    "id": "STbqive8UWQJz3SxeCbu",
    "category": "Casacos"
  },
  {
    "title": "Macacão VELVET MOTION",
    "price": "R$ 219,90",
    "description": "VELVET MOTION 🩷✨\n\nTem peças que ficam bonitas no cabide… e tem peças que fazem quem veste se apaixonar.\n\nNosso macacão bicolor Velvet Motion une o conforto do canelado de compressão com uma modelagem que valoriza o corpo e acompanha cada movimento. O detalhe em rosa traz delicadeza na medida certa e as costas… simplesmente o detalhe que faz toda diferença no look.\n\nModerno, confortável e daqueles que você veste uma vez e já entende o sucesso 🤍",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FSUP5rkF9Py1LFE7m6ldr%2FNormal-17826495856820.jpg?alt=media&token=3eb311afad6edc10731f069195c9fb55",
    "id": "SUP5rkF9Py1LFE7m6ldr",
    "category": "Macacões"
  },
  {
    "title": "Casaco dedinho",
    "price": "R$ 129,90",
    "description": "JAQUETA DE DEDINHO EM POLIAMIDA\n\nAquela terceira peça que muda o look 🤍\nPoliamida com toque geladinho, super confortável e um caimento que veste lindo no corpo. Leve, estilosa e perfeita pra acompanhar do treino ao dia a dia.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FSkf3mPlBW323MXpVwFUc%2FNormal-17826503057090.jpg?alt=media&token=22cc8bb02e36e1586d58ca87242e72a5",
    "id": "Skf3mPlBW323MXpVwFUc",
    "category": "Casacos"
  },
  {
    "title": "Conjunto Compressão",
    "price": "R$ 189,90",
    "description": "CONJUNTO COMPRESSÃO TOP UM OMBRO SÓ\nCompressão na medida certa: sustenta, modela e ainda mantém o conforto. Aquele conjunto que faz você se sentir pronta pra qualquer momento 🖤",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FUleJtfWARWXd0LEJ85aj%2FNormal-17826477912660.jpg?alt=media&token=1db02500d35071274e201fa3e139a2ca",
    "id": "UleJtfWARWXd0LEJ85aj",
    "category": "Conjuntos"
  },
  {
    "title": "Macacão Natalia",
    "price": "R$ 219,90",
    "description": "O + pedido das nossas clientes <3 \nAlta sustentação, canelado de compressão com uma cor que combina com tudo!",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FVxj764aPDul9l0rqzvV5%2FNormal-17801787492450.jpg?alt=media&token=1dd712cc0ee7a624ca4af80e9828cbda",
    "id": "Vxj764aPDul9l0rqzvV5",
    "category": "Macacões"
  },
  {
    "title": "Conjunto canelado de compressão",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FWkFZEcp3UZ7Ny6nFDm74%2F17787174918660.jpg?alt=media&token=0ca8d8b4-4519-491a-a935-871659c5b128",
    "id": "WkFZEcp3UZ7Ny6nFDm74",
    "category": "Conjuntos"
  },
  {
    "title": "Macacão Natalia",
    "price": "R$ 219,90",
    "description": "Essa cor é perfeita para quem quer sair do básico do preto e apostar em uma opção elegante que valoriza o corpo.\nTamanhos M e G \nCanelado de compressão.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FXABl1zEfG4FqRkV1keZs%2FNormal-17803130800560.jpg?alt=media&token=f2a6f8ab9e705b873903756110805de1",
    "id": "XABl1zEfG4FqRkV1keZs",
    "category": "Macacões"
  },
  {
    "title": "Top Iza",
    "price": "R$ 189,90",
    "description": "Cherry é o momento! 🍒\n\nConfortável no vestir e lindo no caimento.\nNosso canelado tem compressão na medida certa: abraça o corpo sem apertar, valoriza sem limitar os movimentos.\n\nVeste do 38 ao 42 ♥️",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FYVRBHAQnvSd99SbkEy68%2FNormal-17826509533600.jpg?alt=media&token=794ef979cad634af2df69cb59d913335",
    "id": "YVRBHAQnvSd99SbkEy68",
    "category": "Conjuntos"
  },
  {
    "title": "Macacão Natalia",
    "price": "R$ 219,90",
    "description": "Costas abertas",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FZdtUYC4CmWbhn8M1Pazh%2F17787177806630.jpg?alt=media&token=1906a3a5-cd79-4589-bb61-1cd5b688ea73",
    "id": "ZdtUYC4CmWbhn8M1Pazh",
    "category": "Macacões"
  },
  {
    "title": "Macacão Natalia",
    "price": "R$ 219,90",
    "description": "Macacão canelado de compressão, lindo! Costas abertas, alças de alta sustentação.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2Fa2YDZoFFEg26UYsiqb5W%2FNormal-17801785953030.jpg?alt=media&token=7f36f6f40871947ed2f8bb03d3db1633",
    "id": "a2YDZoFFEg26UYsiqb5W",
    "category": "Macacões"
  },
  {
    "title": "BLACK YOGA",
    "price": "R$ 219,90",
    "description": "Minimalista, elegante e extremamente confortável.\n\nO macacão Black Yoga foi feito pra acompanhar seus movimentos sem abrir mão do estilo. Com tecido que abraça o corpo com conforto e modelagem que valoriza o caimento, ele entrega aquele visual clean que nunca erra.\n\nDa prática ao dia a dia: um daqueles looks que você veste e se sente incrível.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2Fboar09r6t1YC7lDV4bAD%2FNormal-17826518073110.jpg?alt=media&token=7fb38554d4e041a67fea5718dc5d6b55",
    "id": "boar09r6t1YC7lDV4bAD",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto top Iza",
    "price": "R$ 189,90",
    "description": "Amarelo manteiga: a cor que está conquistando a temporada. \ncanelado de compressão, tamanho unico",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FcPfm7VbQgW9O0FXqVul4%2FNormal-17787172912310.jpg?alt=media&token=d4c77c0dc283d9af4cde103f4bc85b2d",
    "id": "cPfm7VbQgW9O0FXqVul4",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto top Iza",
    "price": "R$ 189,90",
    "description": "Sofisticado, versátil e atemporal. O bege nunca decepciona. 💅\ncanelado de compressão, tamanho unico",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FfQ2fp9LwbUT7jdirNvGD%2FNormal-17787171711470.jpg?alt=media&token=ddcb77f748259f035e5f10e78cfc188e",
    "id": "fQ2fp9LwbUT7jdirNvGD",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto canelado de compressão",
    "price": "R$ 189,90",
    "description": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FfxELpRdw3AoVVoZ7QmNP%2F17787173351850.jpg?alt=media&token=c7a8d0b5-9637-4754-90dd-b36872478bea",
    "id": "fxELpRdw3AoVVoZ7QmNP",
    "category": "Conjuntos"
  },
  {
    "title": "Space Silver",
    "price": "R$ 189,90",
    "description": "SPACE SILVER 🤍✨\n\nUm conjunto que parece ter vindo direto do futuro moderno, marcante e cheio de estilo.\n\nA combinação do prata com branco traz um visual clean com personalidade, perfeito pra quem ama sair do básico sem perder a elegância.\n\nConfortável no vestir, lindo no corpo e com aquele efeito de look montado sem esforço. Porque estilo também está nos detalhes 🚀",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FggABwUBH6nDvNARgaxj6%2FNormal-17826515249770.jpg?alt=media&token=b59588a6b8bd59c91a1979d776853eb5",
    "id": "ggABwUBH6nDvNARgaxj6",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto RUN",
    "price": "R$ 179,90",
    "description": "RUNNERS ✨🏃‍♀️\n\nFeito pra quem gosta de praticidade sem abrir mão de estilo.\n\nO conjunto Runners vem com short com bolso e alta sustentação, trazendo segurança e conforto em cada movimento. O tecido tem ótima qualidade, veste super bem e acompanha a rotina sem perder o caimento.\n\nPerfeito pra treinar, se movimentar e ainda estar bem vestida o dia inteiro.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FgqgbjaxQXAuv7ckBy2iC%2FNormal-17826520242230.jpg?alt=media&token=4f53b47e333f863129c7cdc368e4e59d",
    "id": "gqgbjaxQXAuv7ckBy2iC",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto Flare",
    "price": "R$ 219,90",
    "description": "CONJUNTO FLARE POLIAMIDA + BLUSA DEDINHO EM SUPLEX\n\nConforto com cara de look arrumado 🤍\nA poliamida entrega aquele toque macio e caimento impecável, enquanto o suplex traz estrutura e segurança. Resultado: lindo no corpo e gostoso de usar.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2Fk0BQtFovclDGneIDb3JW%2FNormal-17826474153850.jpg?alt=media&token=d2f308f1a95d878148e7916e82fdf9b9",
    "id": "k0BQtFovclDGneIDb3JW",
    "category": "Conjuntos"
  },
  {
    "title": "Aurora Pink",
    "price": "R$ 189,90",
    "description": "Tudo nesse conjunto foi pensado pra entregar conforto, estilo e qualidade 💖Compressão leve, toque gostoso e um ajuste que valoriza sem marcar. Veste do 38 ao 42.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FmsLJQVdAGILXMxqRUcCZ%2FNormal-17826510898920.jpg?alt=media&token=dabeece3811c93cc0d2e31a7ff451491",
    "id": "msLJQVdAGILXMxqRUcCZ",
    "category": "Conjuntos"
  },
  {
    "title": "JULIA  VAN GOGH",
    "price": "R$ 219,90",
    "description": "JULIA • VAN GOGH 🎨✨\n\nO favorito das clientes em uma versão que é puro estilo 🤍\n\nNosso macacão Júlia une conforto, caimento impecável e aquele toque de personalidade que transforma o look. A combinação de cores Van Gogh traz um visual moderno, marcante e cheio de atitude — sem perder a elegância.\n\nTecido confortável, modelagem que veste super bem e detalhes que fazem ele ser daqueles macacões que a gente coloca e não quer mais tirar.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FnG0IEta06i5rBdx1zHDm%2FNormal-17826519066720.jpg?alt=media&token=b9487db4fdfcfdc6e8e0904778681715",
    "id": "nG0IEta06i5rBdx1zHDm",
    "category": "Conjuntos"
  },
  {
    "title": "Macacão Julia",
    "price": "R$ 219,90",
    "description": "JULIA • COFFEE & MILK 🤎✨\n\nNão é por acaso que o Júlia virou um dos favoritos das minhas clientes 🤍\n\nNosso macacão canelado une conforto, qualidade e um caimento que veste muito bem no corpo. O tecido traz estrutura sem perder a leveza, acompanhando os movimentos com muito conforto.\n\nE nessa combinação café com leite… fica ainda mais elegante, moderno e fácil de se apaixonar ✨",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FnzOnmACOJiaPpGt3rtBM%2FNormal-17826513922710.jpg?alt=media&token=c71174888b312db74cf8fb6df203bc38",
    "id": "nzOnmACOJiaPpGt3rtBM",
    "category": "Macacões"
  },
  {
    "title": "Red e Blue",
    "price": "R$ 219,90",
    "description": "JULIA • RED & BLUE ❤️💙\n\nO macacão que já conquistou as clientes ganhou uma versão ainda mais marcante ✨\n\nNosso Júlia combina o conforto do canelado com uma modelagem que veste super bem e acompanha o corpo com leveza. O contraste do vermelho com azul traz personalidade, estilo e aquele visual que não passa despercebido.\n\nConfortável, estiloso e daqueles que você veste e entende na hora por que virou favorito 💙❤️‍🔥",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2Fo2XBwvw2rq3DdSET6BwQ%2FNormal-17826516896010.jpg?alt=media&token=ee4f1f3813438395ad034a86bcc1982d",
    "id": "o2XBwvw2rq3DdSET6BwQ",
    "category": "Conjuntos"
  },
  {
    "title": "Bicolor Cacau e Canela",
    "price": "R$ 199,90",
    "description": "CACAU & CANELA 🤎✨\n\nTem combinações que já nascem elegantes — e essa é uma delas.\nO encontro do cacau com o canela cria um look sofisticado, moderno e com aquela estética leve que foge do óbvio.\n\nConfortável no vestir, lindo no caimento e versátil pra acompanhar do treino ao café depois. Um conjunto que entrega estilo sem abrir mão do conforto.\n\nDisponível nos tamanhos M e G.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FpyBordYh09ZjMwxPu2so%2FNormal-17826493142860.jpg?alt=media&token=ea9b01b96d8f16f3a46419cd4cd7d0e1",
    "id": "pyBordYh09ZjMwxPu2so",
    "category": "Conjuntos"
  },
  {
    "title": "Conjunto bicolor",
    "price": "R$ 189,90",
    "description": "Para os dias em que você quer estar confortável e impecável ao mesmo tempo.\nCanelado de compressão, tamanho unico.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FsbgpVkIYWmiBpRQrsztq%2FNormal-17787174153130.jpg?alt=media&token=e7984b9966cb700b2a9daa7ee743d7fb",
    "id": "sbgpVkIYWmiBpRQrsztq",
    "category": "Conjuntos"
  },
  {
    "title": "Macacão Suzana",
    "price": "R$ 219,90",
    "description": "Uma peça pensada para valorizar a silhueta com caimento impecável e elegância natural.\nCanelado de compressão \nTamanho unico",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FslF8UQv4DhoPRISvZOKr%2FNormal-17803133456990.jpg?alt=media&token=c3b9ebc44c428abdbde95f3cf6e05f77",
    "id": "slF8UQv4DhoPRISvZOKr",
    "category": "Macacões"
  },
  {
    "title": "Conjunto Hello",
    "price": "R$ 189,90",
    "description": "O conjunto preferido da Boss da Hello! \nCanelado de compressão.",
    "image": "https://firebasestorage.googleapis.com/v0/b/webcatalogo-1.appspot.com/o/6qoLmB0EkQWJnSRhZAvA%2FxrPP2AlhgXP1U5kOiO6K%2FNormal-17801786676180.jpg?alt=media&token=df90c6afa103897c8111c45c41cc8be5",
    "id": "xrPP2AlhgXP1U5kOiO6K",
    "category": "Conjuntos"
  }
];