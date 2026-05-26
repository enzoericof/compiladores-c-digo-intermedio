window.slideMetadata = [
    {
        "slide":  1,
        "name":  "Slide1",
        "text":  "Generación de Código  Intermedio | Compiladores 2024"
    },
    {
        "slide":  2,
        "name":  "Slide2",
        "text":  "Lenguajes intermedios | 1. | Declaraciones\rProposiciones de Asignación\rExpresiones Booleanas\rProposiciones Case\rRelleno con retroceso | Llamada a procedimientos | 7."
    },
    {
        "slide":  3,
        "name":  "Slide3",
        "text":  "Aunque un programa  fuente se puede traducir directamente al lenguaje objeto…\r¿Por qué utilizar forma intermedia?\rSe facilita la redestinación; se puede crear un compilador  para una máquina distinta uniendo una etapa final para la  nueva máquina a una etapa inicial ya existente.\rSe puede aplicar a la representación intermedia un optimizador  de código independiente de la máquina."
    },
    {
        "slide":  4,
        "name":  "Slide4",
        "text":  "Lenguajes Intermedios | 01 | x | y"
    },
    {
        "slide":  5,
        "name":  "Slide5",
        "text":  "Código de tres direcciones | Los árboles sintácticos y la notación postfija son dos clases de representaciones intermedias, aquí introducimos una tercera. \r\rLas reglas semánticas para generar código de tres direcciones a partir de construcciones de lenguajes de programación comunes son similares a las reglas de las representaciones anteriores."
    },
    {
        "slide":  6,
        "name":  "Slide94",
        "text":  "Representaciones Gráficas | En notación postfija: a ( b ( -c ) * ) ( b ( -c ) * ) + asigna | El árbol sintáctico muestra la estructura jerárquica natural de un programa fuente. | El GDA conserva la misma información, pero de forma más compacta porque identifica subexpresiones comunes."
    },
    {
        "slide":  7,
        "name":  "Slide6",
        "text":  "Producirá el GDA si las funciones haznodoun(op, hijo) y haznodo(op, izquierdo, derecho) devuelven un apuntador a un nodo ya existente siempre que sea posible. | Apuntadores devueltos por las llamadas a funciones | haznodo(op, hijo) unario"
    },
    {
        "slide":  8,
        "name":  "Slide7",
        "text":  ""
    },
    {
        "slide":  9,
        "name":  "Slide8",
        "text":  "Código de tres direcciones | El código de tres direcciones es una representación intermedia formada por instrucciones simples. Cada instrucción realiza, en general, una sola operación. No se admite una expresión aritmética compuesta completa, porque en el lado derecho de cada proposición solo aparece un operador. | Forma general:\r\rx := y op z\r\rDonde:\r\rx = lugar donde se guarda el resultado\r\ry = primer operando\r\rz = segundo operando\r\rop = operador | Variables temporales:\r\rCuando una expresión es más compleja, se crean variables temporales para guardar resultados parciales y descomponerla en pasos simples. | ¿Por qué se llama de tres direcciones?\r\rSe llama así porque, normalmente, cada instrucción maneja tres direcciones."
    },
    {
        "slide":  10,
        "name":  "Slide9",
        "text":  "Código de tres direcciones | t1\t= - c;\r\rt2\t= b * t1;\r\rt3\t= - c;\r\rt4\t= b * t3;\r\rt5\t= t2 + t4;\r\ra\t= t5"
    },
    {
        "slide":  11,
        "name":  "Slide10",
        "text":  "Código de tres direcciones | t1\t= - c;\r\rt2\t= b * t1;\r\rt5\t= t2 + t2;\r\ra\t= t5"
    },
    {
        "slide":  12,
        "name":  "Slide11",
        "text":  "Tipos de proposiciones de tres direcciones | 6. param x; call p,n\r7. x\t= y[i]; x[i]\t= y\r8. x := \u0026y | Operación binaria | Operación unaria | Proposiciones de copia | Salto incondicional, se ejecuta la proposición con etiqueta E | Salto condicional, si x pone oprel en relación con y | Secuencia de prop. de 3 direcciones para llamadas a proc. | i unidades de memoria más allá de la posición | Asignación de direcciones"
    },
    {
        "slide":  13,
        "name":  "Slide12",
        "text":  "Traducción dirigida por la sintaxis a código de tres direcciones | Para cada expresión E, el compilador guarda:\r\rE.lugar → variable o temporal donde queda el resultado\r\rE.código → instrucciones necesarias para calcular E | Ejemplo:\r\ra := b * c + d | Traducción:\r\rt1 := b * c\r\rt2 := t1 + d\r\ra := t2 | Idea clave:\r\rPrimero se calcula la expresión en temporales.\r\rLuego se asigna el resultado final a la variable."
    },
    {
        "slide":  14,
        "name":  "Slide95",
        "text":  "Traducción dirigida por la sintaxis a código de  tres direcciones"
    },
    {
        "slide":  15,
        "name":  "Slide13",
        "text":  "Implantaciones de proposiciones de tres direcciones | Cuádruplos | Triples | Triples indirectos"
    },
    {
        "slide":  16,
        "name":  "Slide96",
        "text":  "Implantaciones de proposiciones de tres direcciones | Cuádruplos: Estructura tipo registro, op contiene un código interno para el operador. Los operadores unarios no utilizan arg2 y los que son como param no utilizan ni arg2 ni resultado. Los saltos condicionales e incondicionales no utilizan resultado.\rarg1, arg2 y resultado son generalmente apuntadores a las entradas de la tabla de símbolos.\rLos nombres temporales se deben introducir en la tabla conforme van siendo creados."
    },
    {
        "slide":  17,
        "name":  "Slide97",
        "text":  "Implantaciones de proposiciones de tres direcciones | Triples: Para evitar introducir nombres temporales en la tabla de símbolos."
    },
    {
        "slide":  18,
        "name":  "Slide98",
        "text":  "Implantaciones de proposiciones de tres direcciones | Triples indirectos: Lista de los apuntadores a triples, en lugare de hacer una lista de los triples mismos. \rEn la notación de triples, trasladar una posición que defina a un valor temporal exige que se modifiquen todas las referencias a esa proposición en las matrices arg1 y arg2, los triples indirectos no tienen ese problema porque una proposición se puede trasladar ordenando la lista proposición."
    },
    {
        "slide":  19,
        "name":  "Slide14",
        "text":  "Declaraciones | 02 | 404 NOT FOUND"
    },
    {
        "slide":  20,
        "name":  "Slide15",
        "text":  "Declaraciones dentro de un procedimiento | La sintaxis de lenguajes como C, Pascal y Fortran permite que todas las declaraciones en un solo procedimiento se procesen como un grupo. | En este caso, una variable global, por ej desplazamiento, puede contener la siguiente dirección relativa disponible."
    },
    {
        "slide":  21,
        "name":  "Slide16",
        "text":  "Declaraciones dentro de un procedimiento | Para cada producción tenemos los no terminal P (procedimiento), D (declaración), T (tipo). | En T, tenemos los atributos sintetizados T.tipo y T.ancho. | En P, desplazamiento contiene la siguiente dirección relativa disponible."
    },
    {
        "slide":  22,
        "name":  "Slide99",
        "text":  "Declaraciones dentro de un procedimiento | Se pueden utilizar los no terminales que generen ε, llamados no terminales marcadores, para reescribir producciones de modo que todas las cciones aparezcan en los extremos derechos. | Con un no terminal marcador M, se puede replantear como:"
    },
    {
        "slide":  23,
        "name":  "Slide17",
        "text":  "Registro de información sobre el ámbito | En un lenguaje con procedimientos anidados, se pueden asignar direcciones relativas a los nombres locales a cada procedimiento utilizando el enfoque de la figura 8.11. | Cuando se encuentre a un procedimiento anidado, se suspende temporalmente el proceso de las declaraciones del procedimiento abarcador."
    },
    {
        "slide":  24,
        "name":  "Slide20",
        "text":  "Registro de información sobre el ámbito | Por ejemplo, para el siguiente programa en Pascal. | Orden de anidados de los procedimientos."
    },
    {
        "slide":  25,
        "name":  "Slide21",
        "text":  "Registro de información sobre el ámbito | Las tablas de símbolos para estos procedimientos anidados es la siguiente:"
    },
    {
        "slide":  26,
        "name":  "Slide18",
        "text":  "Registro de información sobre el ámbito | Este enfoque se ilustrara añadiendo reglas semánticas al siguiente lenguaje."
    },
    {
        "slide":  27,
        "name":  "Slide19",
        "text":  "Registro de información sobre el ámbito | Este enfoque se ilustrara añadiendo reglas semánticas al siguiente lenguaje. | Para estos procesos anidados, se puede usar una lista enlazada de entrada correspondiente  a los nombre para poder representar una tabla de símbolos distinta para cada procedimiento  en el lenguaje (8.3).\r\rEl único cambio con respecto a la figura 8.11 es que al procedimiento introduce se le debe  indicar que tabla de símbolos debe realizar una entrada, introduce(tabla, nombre, tipo,  desplazmiento)."
    },
    {
        "slide":  28,
        "name":  "Slide23",
        "text":  "Registro de información sobre el ámbito | ***creatabla (previa):*** crea una nueva tabla de símbolos y devuelve una puntadora la nueva tabla. El argumento previa apunta a una tabla de símbolos creada previamente, se supone que la correspondiente al procedimiento abarcador. El apuntador previa se coloca en un encabezamiento para la nueva tabla de símbolos, junto con información adicional como la profundidad de anidamiento de un procedimiento. También se pueden numerar los procedimientos en el orden en que se declaran y guardar dicho número en el encabezamiento.\n***introduce(tabla, nombre, tipo, desplazamiento):*** crea una nueva entrada correspondiente a nombre en la tabla de símbolos apuntada por tabla. Denuevo, introduce coloca el tipo tipo y la dirección relativa desplazamiento en campos dentro de la entrada.\n***añadeancho (tabla, ancho):*** registra el ancho acumulado de todas las entradas de tabla en el encabezamiento asociado con esta tabla de símbolos.\n***introduceproc (tabla, nombre, tablanueva):*** crea una entrada nueva para el procedimiento nombre dentro de la tabla de símbolos apuntada por tabla. El argumento tablanueva apunta a la tabla de símbolos correspondiente a este procedimiento nombre."
    },
    {
        "slide":  29,
        "name":  "Slide22",
        "text":  "Registro de información sobre el ámbito | El esquema de traducción de la figura muestra cómo se pueden colocar los datos en una pasada. | Utilizando la pila **tblapn** para guardar apuntadores a las tablas de símbolos de los procedimientos abarcadores. | La otra pila **desplazamiento** es la generalización natural a procedimientos anidados del atributo desplazamiento de la figura 8.11, es decir, el elemento tope de desplazamiento es la siguiente dirección relativa disponible para un nombre local del procedimiento en curso."
    },
    {
        "slide":  30,
        "name":  "Slide24",
        "text":  "Nombres de campos dentro de registros. | Las siguientes producciones permiten que el no terminal T genere registros además de tipos  básicos, apuntadores y matrices: | Las acciones del esquema de traducción de la ﬁgura 8.14 ponen de relieve la similitud entre la  disposición de los registros como una construcción de un lenguaje y los registros de activación."
    },
    {
        "slide":  31,
        "name":  "Slide25",
        "text":  "Nombres de campos dentro de registros. | Después de que aparezca la palabra clave **record**, la acción asociada con el marcador **L** crea una nueva tabla de símbolos para los nombres de los campos con **t := creatabla(nil)**; luego, con **mete(t, tblapn)** y **mete(0, desplazamiento)**, se introduce un apuntador en esta tabla de símbolos en la pila **tblapn** y la dirección relativa 0 se introduce en la pila **desplazamiento**, respectivamente."
    },
    {
        "slide":  32,
        "name":  "Slide26",
        "text":  "Nombres de campos dentro de registros. | Luego en D, la acción correspondiente D-\u003eid:T de la ﬁgura 8.13 introduce por tanto la información sobre el nombre del  campo id en la tabla de símbolos correspondiente al registro. | Además, el tope de la pila desplazamiento contendrá el ancho de todos los objetos de datos dentro del registro después  que se hayan examinado los campos. | Producción D de la ﬁgura 8.13:"
    },
    {
        "slide":  33,
        "name":  "Slide27",
        "text":  "Nombres de campos dentro de registros. | La acción que sigue en end devuelve este ancho como el atributo sintetizado T.ancho. | El tipo T.tipo se obtiene aplicando el constructor record al apuntador a la tabla de símbolos correspondiente a este registro: record(tope(tblapn))."
    },
    {
        "slide":  34,
        "name":  "Slide28",
        "text":  "Proposiciones de Asignación | 03"
    },
    {
        "slide":  35,
        "name":  "Slide29",
        "text":  "Nombres dentro de la tabla de símbolos | Como encontrar nombres en la tabla de símbolos: | Comprueba si existe una entrada para este caso del nombre en la tabla de símbolos | Emitir proposiciones de tres direcciones a un archivo de salida, en vez de crear atributos código"
    },
    {
        "slide":  36,
        "name":  "Slide30",
        "text":  "Reutilización de nombres temporales | La mayor parte de los temporales que indican datos se genera durante la traducción dirigida por la sintaxis de las expresiones, mediante reglas. Por ej., el código generado por las reglas E→ E1 + E2 de la fig. 8.15 tiene la forma general:\revaluar E1 en t1;\r\revaluar E2 en t2;\r\rt := t1 + t2"
    },
    {
        "slide":  37,
        "name":  "Slide31",
        "text":  "Ejemplo - Reutilización de nombres temporales | Considérese la siguiente asignación: x := a * b + c * d - e * f\rEs posible modificar tempnuevo para que utilice, como si fuera una pila, una pequeña matriz para guardar temporales. Se lleva una cuenta inicializada con cera, cuando se utilice como operando un nombre temporal, se disminuye c en 1, cuando se genere un nuevo nombre, se incrementa c en 1"
    },
    {
        "slide":  38,
        "name":  "Slide32",
        "text":  "Acceso a elementos de matrices | Se puede acceder rápidamente a los elementos de una matriz si se  guardan en un bloque de posiciones consecutivas. Si el ancho de  cada elemento de la matriz es a, entonces el i-ésimo elemento de  la matriz A comienza en la posición:\rbase + (i - inf) x a\rSe puede reescribir como:\ri x a + (base - inf x a)\rinf es el limite inferior de los subíndices y base es la dirección relativa de la posición de memoria asignada a la matriz"
    },
    {
        "slide":  39,
        "name":  "Slide33",
        "text":  "Acceso a elementos de matrices | Pascal\t\t\tFortran | El generador de código intermedio debe ser capaz de calcular las direcciones de memoria de los elementos individuales de la matriz, utilizando los índices proporcionados en la proposición de asignación. Una vez que se ha calculado la dirección de memoria del elemento deseado, el generador de código intermedio puede emitir las instrucciones apropiadas para realizar la asignación."
    },
    {
        "slide":  40,
        "name":  "Slide34",
        "text":  "Acceso a elementos de matrices | El problema principal de generar código para referencias de matrices es  relacionar los cálculos con una gramática para referencias de matrices. Se  pueden permitir las referencias a matrices en las asignaciones si se  admite el no terminal L con las siguientes producciones donde id aparece  en la ﬁgura 8.15:\r\r\rPara que los límites de las distintas dimensiones nj de la matriz se  encuentren disponibles cuando se agrupan las expresiones de índices  dentro de una listaE, es útil reescribir las producciones de la forma:\r\r\r\rlistaE representa una lista de expresiones de índices. E representa un índice para acceder a un elemento de la matriz.\rL -\u003e id sigue permitiendo referencias a variables simples\rlistaE -\u003e listaE, E permite que la lista de expresiones de índices se extienda con más expresiones separadas por comas."
    },
    {
        "slide":  41,
        "name":  "Slide35",
        "text":  "Esquema de traducción para acceder a elementos  de matrices | S → L\t:= E\rE → E + E\r3. E → (E)\rE → L\rL → listaE]\rL → id\rlistaE → listaE,E\rlistaE → id [E"
    },
    {
        "slide":  42,
        "name":  "Slide36",
        "text":  "Esquema de traducción para acceder a elementos  de matrices"
    },
    {
        "slide":  43,
        "name":  "Slide37",
        "text":  "Esquema de traducción para acceder a elementos  de matrices"
    },
    {
        "slide":  44,
        "name":  "Slide38",
        "text":  "Esquema de traducción para acceder a elementos  de matrices"
    },
    {
        "slide":  45,
        "name":  "Slide39",
        "text":  "Esquema de traducción para acceder a elementos  de matrices | L.Desplazamiento es un temporal nuevo que representa el primer termino de | ancho(listaE.matriz) devuelve a\rL.lugar representa el segundo termino de 8.6 que es devuelto por la función c(listaE.matriz)"
    },
    {
        "slide":  46,
        "name":  "Slide40",
        "text":  "Esquema de traducción para acceder a elementos  de matrices"
    },
    {
        "slide":  47,
        "name":  "Slide41",
        "text":  "Esquema de traducción para acceder a elementos  de matrices"
    },
    {
        "slide":  48,
        "name":  "Slide42",
        "text":  "Esquema de traducción para acceder a elementos  de matrices"
    },
    {
        "slide":  49,
        "name":  "Slide44",
        "text":  "Conversiones de tipo dentro de asignaciones"
    },
    {
        "slide":  50,
        "name":  "Slide45",
        "text":  "Expresiones Booleanas | 04"
    },
    {
        "slide":  51,
        "name":  "Slide46",
        "text":  "Expresiones booleanas. | Las expresiones booleanas se utilizan para calcular valores lógicos y como  expresiones condicionales que alteran el ﬂujo del programa.\rSe consideran las expresiones booleanas generadas por la gramática:"
    },
    {
        "slide":  52,
        "name":  "Slide47",
        "text":  "Métodos para traducir expresiones booleanas. | Hay dos métodos principales para representar los valores de una expresión booleana:\rCodiﬁcar numéricamente los valores true y false (como se suele hacer con 1  y 0)\rMediante el ﬂujo de control, representando el valor de una expresión booleana  mediante la posición alcanzada en un programa.\r\rLa semántica de los lenguajes de programación determina si se deben evaluar todas las  partes de una expresión booleana."
    },
    {
        "slide":  53,
        "name":  "Slide48",
        "text":  "Representación Numérica | Se utiliza 1   para indicar el valor TRUE, 0 para indicar el valor FALSE.\r\rLas expresiones se evaluaran completamente de izquierda a derecha, de manera  similar a las expresiones aritméticas."
    },
    {
        "slide":  54,
        "name":  "Slide49",
        "text":  "Representación Numérica | Se utiliza 1  para indicar el valor TRUE, 0 para indicar el valor FALSE.\r\rLas expresiones se evaluaran completamente de izquierda a derecha, de manera  similar a las expresiones aritméticas.\r\rEjemplo:\rLa traducción de:\ra or b and not c\res la secuencia de tres direcciones siguiente:  t1 := not c\rt2 := b and t1\rt3 := a or t2"
    },
    {
        "slide":  55,
        "name":  "Slide50",
        "text":  "Representación Numérica | Una expresión relacional como a \u003c b es equivalente a la proposición condicional if a \u003c  b then 1 else 0, que se puede traducir a:"
    },
    {
        "slide":  56,
        "name":  "Slide51",
        "text":  "Representación Numérica | En la anterior ﬁgura se ve un esquema de  traducción para producir código de tres  direcciones para expresiones booleanas."
    },
    {
        "slide":  57,
        "name":  "Slide52",
        "text":  "Codigo cortocircuito | En el código de corto circuito (o de salto), se puede traducir una expresión  booleana a código de tres direcciones sin generar código para ninguno de los  operadores booleanos y sin que haya que evaluar necesariamente la expresión  completa (se traducen en saltos)"
    },
    {
        "slide":  58,
        "name":  "Slide53",
        "text":  "Codigo cortocircuito | En el código de corto circuito (o de salto), se puede traducir una expresión  booleana a código de tres direcciones sin generar código para ninguno de los  operadores booleanos y sin que haya que evaluar necesariamente la expresión  completa (se traducen en saltos)\rEjemplo:\rPara expresion a\u003cb or c\u003cd and e\u003cf podría traducirse de la forma:"
    },
    {
        "slide":  59,
        "name":  "Slide54",
        "text":  "Proposiciones de flujo de control | Ahora se considera la traducción de expresiones booleanas dentro del código  de tres direcciones en el contexto de proposiciones if-then, if-then-else y  while-do como las generadas en la siguiente gramática:"
    },
    {
        "slide":  60,
        "name":  "Slide55",
        "text":  "Proposiciones de flujo de control | Con una expresión booleana E se asocian dos etiquetas:  E.verdadera, la etiqueta a la que ﬂuye el control si E es  verdadera, y E.falsa, la etiqueta a la que ﬂuye el control si E  es falsa.\r\rLas reglas semánticas para traducir S permiten que el  control ﬂuya desde la traducción S.codigo a la instrucción  de tres direcciones situada inmediatamente después de  S.codigo.\r\r\rEl valor S.siguiente es una etiqueta que se asocia a la  primera instrucción de tres direcciones que se ejecuta  después del código correspondiente a S."
    },
    {
        "slide":  61,
        "name":  "Slide56",
        "text":  "Proposiciones de flujo de control | (a) Al traducir if-then, S -\u003e if E then S1, se crea una  nueva etiqueta E.verdadera y se asocia a la primera  instrucción de tres direcciones generada para la  proposición S1."
    },
    {
        "slide":  62,
        "name":  "Slide57",
        "text":  "Proposiciones de flujo de control | (b) Al traducir if-then-else, S -\u003e if E then S1 else S2,  el código correspondiente a la expresión booleana E  salta afuera de él a la primera instrucción del código  para S1 si E es verdadera y S2 si es falsa.\r\rS.siguiente proporciona la etiqueta de la instrucción  que debe ejecutarse después de  ejecutar el código  de S."
    },
    {
        "slide":  63,
        "name":  "Slide58",
        "text":  "Proposiciones de flujo de control | (c) El código para S -\u003e while E do S1, se crea y se  asocia una nueva etiqueta S.comienzo a la primera  instrucción generada por E. Otra etiqueta nueva,  E.verdadera, se asocia a la primera instrucción de S1.  El código para E genera un salto a esta etiqueta si E es  verdadera y un salto a S.siguiente si E es falsa; de  nuevo, se iguala E.falsa a S.siguiente.\r\rDespués del código para S1 se coloca la instrucción  goto S.comienzo, que produce un salto de vuelta al  principio del código correspondiente a la expresión  booleana."
    },
    {
        "slide":  64,
        "name":  "Slide59",
        "text":  "Traducciones a flujo de control de expresiones  booleanas | E se traduce a una secuencia de proposiciones de tres direcciones que evalúan E como  una secuencia de saltos condicionales e incondicionales a una de dos posiciones:  E.verdadera. el lugar que debe alcanzar el ﬂujo del control si E es verdadera, y E.falsa, el  lugar que debe alcanzar el control si E es falsa."
    },
    {
        "slide":  65,
        "name":  "Slide60",
        "text":  "Traducciones a flujo de control de expresiones  booleanas | En la ﬁgura 8.24 se muestra una deﬁnición dirigida por  la sintaxis que genera código de tres direcciones para  expresiones booleanas.\rObsérvese que los atributos verdadera y falsa son  heredados.\r\rEl problema de las definiciones de la figura 8.24 es que  genera líneas de código redundante."
    },
    {
        "slide":  66,
        "name":  "Slide61",
        "text":  "Traducciones a flujo de control de expresiones  booleanas"
    },
    {
        "slide":  67,
        "name":  "Slide62",
        "text":  "Expresiones booleanas en modo mixto | Hay que tener en cuenta que en la práctica, las expresiones booleanas a menudo contienen  sub expresiones aritméticas como en (a+b) \u003c c. En ciertos lenguajes por ejemplo se puede  considerar una expresión aritmética la siguiente expresión booleana (a\u003cb) + (b\u003ca), esto  puede ser 0 si a y b son iguales y 1 en caso contrario."
    },
    {
        "slide":  68,
        "name":  "Slide63",
        "text":  "Expresiones booleanas en modo mixto | Para generar código en esta situación, se utiliza el atributo  sintetizado E.tipo, que será aritm o bool, dependiendo del  tipo de E.\r\rE tendrá los atributos heredados E.verdadera y E.falsa para  expresiones booleanas y atributos sintetizados E.lugar para  las expresiones aritméticas."
    },
    {
        "slide":  69,
        "name":  "Slide64",
        "text":  "Proposiciones Case | 05 | x | y"
    },
    {
        "slide":  70,
        "name":  "Slide65",
        "text":  "Traducción dirigida por la sintaxis de proposiciones  case | La proposición “switch” o “case” se encuentra disponible en una variedad de lenguajes.  La sintaxis de proposición switch que se muestra es la siguiente:"
    },
    {
        "slide":  71,
        "name":  "Slide66",
        "text":  "Traducción dirigida por la sintaxis de proposiciones  case | Hay una expresión seleccionadora, que debe evaluarse, seguida de n valores constantes que puede tomar  la expresión.\r\rLa traducción deseada de una proposición switch es código para:\rEvaluar la expresión\rEncontrar qué valor de la lista de casos es el mismo que el valor de la expresión.\rEjecutar la proposición asociada con el valor encontrado"
    },
    {
        "slide":  72,
        "name":  "Slide67",
        "text":  "Traducción dirigida por la sintaxis de proposiciones  case | Considérese la siguiente proposición switch: | Con un esquema de traducción dirigida por la sintaxis, es conveniente traducir  esta proposición switch a un código intermedio."
    },
    {
        "slide":  73,
        "name":  "Slide68",
        "text":  "Traducción dirigida por la sintaxis de proposiciones  case | Convertimos a:"
    },
    {
        "slide":  74,
        "name":  "Slide69",
        "text":  "Traducción dirigida por la sintaxis de proposiciones  case | En ﬁgura de código intermedio generado, las comprobaciones se  encuentran al ﬁnal, para que un generador de código simple  pueda reconocer la ramiﬁcación y generar código eﬁciente.\rObsérvese que no es conveniente colocar las proposiciones de  ramiﬁcación al principio, porque el compilador no podría  entonces emitir código para cada una de las S, conforme las  fuera encontrando.\rCuando aparezca la palabra clave case se crea una nueva  etiqueta Li y se introduce en la tabla de símbolos. Cada  proposición case V¡: S , se procesa emitiendo la etiqueta recién  creada Li seguida del código para Si."
    },
    {
        "slide":  75,
        "name":  "Slide70",
        "text":  "Relleno con Retroceso | 06 | 404 NOT FOUND"
    },
    {
        "slide":  76,
        "name":  "Slide71",
        "text":  "Relleno con Retroceso | La forma fácil de implantar las deﬁniciones dirigidas por las sintaxis para las expresiones  regulares y las preposiciones de ﬂujo de control es utilizar dos pasadas, ya que en una sola  pasada es posible que no se conozcan las etiquetas a las que debe ir el control en el  momento en que se generan las proposiciones de salta (goto).\r\rPara evitar este problema se genera una serie de proposiciones de ramiﬁcación sin  especiﬁcar temporalmente los destinos de los saltos, en donde cada una de estas  preposiciones se colocara en una lista de proposiciones goto cuyas etiquetas se  rellenaran cuando se pueda determinar la etiqueta adecuada. Este relleno posterior de  etiquetas se denomina relleno de retroceso."
    },
    {
        "slide":  77,
        "name":  "Slide72",
        "text":  "Relleno con Retroceso | Para poder utilizar el relleno de retroceso se generan cuadruplos en una matriz cuádruplo en  donde las etiquetas serán índices en esta matriz, se utiliza este método para una mayor  concreción.\r\rPara manipular listas de etiquetas se utilizan tres funciones:\rcrealista(i) crea una lista nueva que contiene sólo i, un índice para la matriz de cuádruplos;\rcrealista devuelve un apuntador a la lista que ha elaborado.\rfusiona(p1, p2) concatena las listas apuntadas por p1 y p2, y devuelve un apuntador a la  lista concatenada.\rcompleta (p, i) inserta i como la etiqueta objeto de cada una de las proposiciones de la lista  apuntada por p."
    },
    {
        "slide":  78,
        "name":  "Slide73",
        "text":  "Expresiones booleanas | Ahora se construye un esquema de traducción adecuado para  producir cuadruplos para  las  expresiones booleanas durante el análisis sintáctico ascendente.\rLa gramática que se utiliza es la siguiente:"
    },
    {
        "slide":  79,
        "name":  "Slide74",
        "text":  "Expresiones booleanas | Los atributos sintetizados listaverdad y listafalso del no  terminal E se utilizan para generar código de salto para las  expresiones booleanas.\r\rLos saltos a las salidas verdadero y falso se dejan incompletos,  sin rellenar el campo de la etiqueta.\r\rEstos saltos incompletos se colocan en listas apuntadas por\rE.listaverdad y E.listafalso, de manera apropiada."
    },
    {
        "slide":  80,
        "name":  "Slide75",
        "text":  "Expresiones booleanas | Ejemplo:\rSi consideramos la siguiente expresión a \u003c b or c \u003c d and e \u003c f  (Hay que tener en cuenta que la enumeración de nuestra  proposiciones será arbitraria y será 100.)"
    },
    {
        "slide":  81,
        "name":  "Slide76",
        "text":  "Expresiones booleanas | Ejemplo:\rSi consideramos la siguiente expresión a \u003c b or c \u003c d and e \u003c f  (Hay que tener en cuenta que la enumeración de nuestra  proposiciones será arbitraria y será 100.)\r\rEn respuesta a la reducción a \u003c b a E por la  producción (5), se genera los cuádruplos: | En donde el no terminal M en la producción (1) registra el  valor de sigtecuad, que en ese momento es 102."
    },
    {
        "slide":  82,
        "name":  "Slide77",
        "text":  "Expresiones booleanas | Ejemplo:\rSi consideramos la siguiente expresión a \u003c b or c \u003c d and e \u003c f  (Hay que tener en cuenta que la enumeración de nuestra  proposiciones será arbitraria y será 100.)\r\rLa reducción de c \u003c d a E por la producción (5) genera  los cuadruplos: | Ahora se ha visto E1 en la producción (2). El marcador no  terminal M esta producción registra el valor en curso de  sigtecuad, que ahora es 104."
    },
    {
        "slide":  83,
        "name":  "Slide78",
        "text":  "Expresiones booleanas | Ejemplo:\rSi consideramos la siguiente expresión a \u003c b or c \u003c d and e \u003c f  (Hay que tener en cuenta que la enumeración de nuestra  proposiciones será arbitraria y será 100.)\r\rReduciendo e \u003c f a E por la producción (5) genera:"
    },
    {
        "slide":  84,
        "name":  "Slide79",
        "text":  "Expresiones booleanas | Ahora se reduce por la producción (2), la acción semántica  correspondiente llama a completa({102}, 104), donde {102} como  argumento indica un apuntador a la lista que contiene solo a 102,  siendo esa lista apuntada por E1.listaverdad.\rEsta llamada completa pone 104 en la proposición 102. Por tanto  lo generado hasta ahora es:"
    },
    {
        "slide":  85,
        "name":  "Slide80",
        "text":  "Expresiones booleanas | La acción semántica asociada con la reducción ﬁnal por (1) llama a  completa({101}, 102) que deja a las proposiciones como: | Como se puede observar, toda esta expresión es verdadera ssi se  alcanzan los goto de las proposiciones 100 o 104, y falsa ssi al  alcanzar 103 y 105."
    },
    {
        "slide":  86,
        "name":  "Slide81",
        "text":  "Expresiones booleanas"
    },
    {
        "slide":  87,
        "name":  "Slide82",
        "text":  "Proposiciones de flujo del control | Ahora se muestra como se puede utilizar el relleno de retroceso para traducir proposiciones  de ﬂujo del control en una sola pasada. Como antes, la atención se concentra en la generación  de cuádruplos.\r\rA modo de ejemplo más extenso, se desarrolla un esquema de traducción para  proposiciones generadas por la siguiente semántica."
    },
    {
        "slide":  88,
        "name":  "Slide83",
        "text":  "Proposiciones de flujo del control | S indica una proposición, L una lista de proposiciones, A una  proposición de asignación  y E una expresión booleana.\r\rSe emplea  la misma  estructura de código para  las  proposiciones\rif-then, if-then-else y While-do de la sección anterior vista.\r\rEl enfoque general elegido será rellenar los saltos fuera de las  proposiciones cuando se encuentren sus destinos. No solo las  expresiones booleanas necesitan de dos listas de saltos que ocurren  cuando la expresión es verdadera y cuando es falsa, si no que las  proposiciones también necesitan listas de saltos al código que les  sigue en la secuencia de ejecución."
    },
    {
        "slide":  89,
        "name":  "Slide84",
        "text":  "Esquema para implantar la traducción | A continuación se describe un esquema de traducción dirigido por la sintaxis para  generar traducciones para las construcciones de ﬂujo de control dadas  anteriormente.\r\rEl no terminal E tiene atributos de listaverdad y listafalso, como antes.\rL y S también necesitan una lista de cuadruplos vacíos que más tarde se habrá  que completar con relleno de retroceso.\rS.siguientelista es un apuntador a una lista que apunta a los saltos incondicionales y  condicionales al cuádruplo que le sigue a S en orden de su ejecución. L.siguientelista se  deﬁne de manera similar.\rEn todos los casos, el no terminal marcador M registra el número del  siguiente cuádruplo."
    },
    {
        "slide":  90,
        "name":  "Slide85",
        "text":  "Esquema para implantar la traducción | Obsérvese que no se generan nuevos  cuadruplos en ninguna parte en estas reglas  semánticas, excepto en las reglas (2) y (5).\r\rEl resto del código se genera mediante las  acciones semánticas asociadas con las  proposiciones de asignación y las expresiones."
    },
    {
        "slide":  91,
        "name":  "Slide86",
        "text":  "Llamada a Procedimientos | 07"
    },
    {
        "slide":  92,
        "name":  "Slide87",
        "text":  "Llamada a Procedimientos | El procedimiento es una construcción de programación tan importante y utilizada  tan a menudo que es fundamental que un compilador genere buen código para  llamadas y retornos de procedimientos.\r\rSon parte del paquete de apoyo para la ejecución, las rutinas en tiempo de  ejecución que manejan el paso de argumentos a los procedimientos, las llamadas y  los retornos."
    },
    {
        "slide":  93,
        "name":  "Slide88",
        "text":  "Secuencias de llamadas | Aunque las secuencias diﬁeren, tienen lugar las siguientes acciones:\rCuando ocurre la llamada a un procedimiento P, se debe asignar  espacio para el registro de activación de P.\rLos argumentos del procedimiento llamado se deben evaluar y poner  a disposición del procedimiento llamado en lugar conocido.\rSe deben establecer los apuntadores de ambiente para permitir que el  procedimiento llamado tenga acceso a los datos de los procedimientos  abarcadores.\rSe debe guardar el estado del procedimiento que efectúa la llamada para que pueda reanudar la ejecución después de la llamada.\rSe guarda en un lugar conocido la dirección de retorno, que es la posición a la que la rutina llamada debe transferir el control cuando finalice\rPor último, se debe generar un salto al principio del código del  procedimiento llamado."
    },
    {
        "slide":  94,
        "name":  "Slide89",
        "text":  "Llamada a Procedimientos | Cuando vuelve el procedimiento:\rSi el procedimiento llamado es una función, el resultado se debe guardar en un lugar  conocido.\r\rSe debe restablecer el registro de activación del procedimiento que hace la llamada y hay  que generar un salto a la dirección de retorno del procedimiento autor de la llamada.\r\rNo existe una división exacta de las tareas en el momento de la ejecución entre el  procedimiento que hace la llamada y el procedimiento que recibe la llamada."
    },
    {
        "slide":  95,
        "name":  "Slide90",
        "text":  "Ejemplo sencillo | Una gramática sencilla para la llamada a un procedimiento: | Considere que los parámetros se pasan por referencia y la memoria se asigna  estáticamente.\rEn esta situación, se utilizan las proposiciones param como depositarias de los argumentos.  Al procedimiento receptor de la llamada se le pasa un apuntador en un registro a la primera  de las preposiciones param, y puede obtener un apuntador a cualquiera de sus argumentos  utilizando el desplazamiento apropiado."
    },
    {
        "slide":  96,
        "name":  "Slide92",
        "text":  "Ejemplo sencillo | Cuando se genera código de tres direcciones basta con generar las proposiciones de tres  direcciones necesarias para evaluar los argumentos que sean expresiones distintas de  nombres simples, después tiene que haber una lista de proposiciones de tres direcciones  param, una por cada argumento. Se usa una cola para guardar estos valores.\rLa siguiente traducción dirigida por la sintaxis incorpora estas ideas:"
    },
    {
        "slide":  97,
        "name":  "Slide93",
        "text":  "Gracias por la atención"
    }
]
;
