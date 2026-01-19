# cmpc-libros
prueba técnica 


## Arquitectura 
En el backend se opto por una arquitectura clean, lo que permite menor dependencia entre los elementos y alta escalabilidad.
```
┌──────────────────────────┐
│ Infrastructure           │ ← DB, Persistencia
├──────────────────────────┤
│ Presentation             │ ← Controllers
├──────────────────────────┤
│ Application              │ ← Use Cases, Servicios, DTO
├──────────────────────────┤
│ Domain                   │ ← Entidades y Repositorios
└──────────────────────────┘
```

## Estructura del proyecto 
En el caso del backend se opto por separar en modulos bajo el uso de la arquitecura clean, el proyecto esta estructurado de la siguiente manera:
```
src/
├── modules
│   ├── libros/
│   │   ├── Domain/
│   │   │   ├── Models/
│   │   │   └── Repositories/        ← Ports de salida
│   │   │
│   │   ├── Application/
│   │   │   ├── useCases/            ← Ports de entrada
│   │   │   ├── mappers/            
│   │   │   └── DTOs/
│   │   │
│   │   ├── Infrastructure/
│   │   │   ├── Persistence/
│   │   │   │   └── Sequelize/    ← Adapters de salida
│   │   │   │       ├── adapters/
│   │   │   │       └── adapters/
|   │   │   └── Mappers/
│   │   │
│   │   └── Presentation/
│   │       └── Controllers/         ← Adapters de entrada
│   └── auth/...
└── common/
    └── filters/    
```

## Configuracion inicial
1. ejecutar los scripts de base de datos ubicados en la raiz del proyecto en el siguiente orden:
* db script.txt
* db insert script.txt


## Levantamiento

1. levantar el backend desde la raiz del repositorio
```bash
cd backend
nest start
```

2. levantar el frontend desde la raiz del repositorio
```bash
cd frontend
npm run dev
```
