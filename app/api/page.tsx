import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Database, Key, Globe, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function APIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              API Reference
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">API MuacoDB</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              APIs REST poderosas e fáceis de usar para todas as suas necessidades de base de dados
            </p>
          </div>

          {/* API Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Base URL</span>
                </CardTitle>
                <CardDescription>Todas as APIs estão disponíveis através do endpoint base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded font-mono text-sm">https://api.muacodb.com</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-primary" />
                  <span>Autenticação</span>
                </CardTitle>
                <CardDescription>Use Bearer token no header Authorization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded font-mono text-sm">Authorization: Bearer YOUR_API_KEY</div>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Endpoints Principais</h2>

              <div className="space-y-6">
                {/* Database Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="h-5 w-5 text-primary" />
                      <span>Gestão de Bases de Dados</span>
                    </CardTitle>
                    <CardDescription>Criar, listar e gerir suas bases de dados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          POST
                        </Badge>
                        <code className="text-sm">/api/databases</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Criar nova base de dados</p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                        {`{
  "name": "minha-base-dados"
}`}
                      </pre>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          GET
                        </Badge>
                        <code className="text-sm">/api/databases</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Listar todas as bases de dados do usuário</p>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          DELETE
                        </Badge>
                        <code className="text-sm">/api/databases/{`{uuid}`}</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Eliminar base de dados</p>
                    </div>
                  </CardContent>
                </Card>

                {/* CRUD Operations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span>Operações CRUD</span>
                    </CardTitle>
                    <CardDescription>Create, Read, Update, Delete nos seus dados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          POST
                        </Badge>
                        <code className="text-sm">/db/{`{uuid}`}/data</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Inserir novo registo</p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                        {`{
  "nome": "João Silva",
  "idade": 30,
  "email": "joao@example.com"
}`}
                      </pre>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          GET
                        </Badge>
                        <code className="text-sm">/db/{`{uuid}`}/data</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Listar todos os registos</p>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          PUT
                        </Badge>
                        <code className="text-sm">
                          /db/{`{uuid}`}/data/{`{id}`}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">Atualizar registo específico</p>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          DELETE
                        </Badge>
                        <code className="text-sm">
                          /db/{`{uuid}`}/data/{`{id}`}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">Eliminar registo específico</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Code Examples */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Exemplos de Código</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>JavaScript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                      {`// Inserir dados
const response = await fetch(
  "https://api.muacodb.com/db/YOUR_UUID/data",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: "João",
      idade: 30
    })
  }
);

const data = await response.json();
console.log(data);`}
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Python</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                      {`import requests

url = "https://api.muacodb.com/db/YOUR_UUID/data"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "nome": "João",
    "idade": 30
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>C#</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                      {`using System.Net.Http;
using System.Text;

var client = new HttpClient();
client.DefaultRequestHeaders.Add(
    "Authorization", "Bearer YOUR_API_KEY"
);

var json = "{\\"nome\\":\\"João\\",\\"idade\\":30}";
var content = new StringContent(
    json, Encoding.UTF8, "application/json"
);

var response = await client.PostAsync(
    "https://api.muacodb.com/db/YOUR_UUID/data", 
    content
);

var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`}
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>PHP</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                      {`<?php
$url = "https://api.muacodb.com/db/YOUR_UUID/data";
$data = json_encode([
    "nome" => "João",
    "idade" => 30
]);

$options = [
    "http" => [
        "header" => [
            "Authorization: Bearer YOUR_API_KEY",
            "Content-Type: application/json"
        ],
        "method" => "POST",
        "content" => $data
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo $result;
?>`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Funcionalidades da API</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      APIs otimizadas com cache inteligente e CDN global para resposta rápida
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Segurança</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      HTTPS obrigatório, rate limiting e autenticação por API key
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Global</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Infraestrutura distribuída globalmente para baixa latência
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-muted-foreground mb-6">Crie sua conta e comece a usar as APIs em minutos</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Começar Grátis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">Ver Documentação</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
