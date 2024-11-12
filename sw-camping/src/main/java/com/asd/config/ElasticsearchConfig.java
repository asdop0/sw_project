package com.asd.config;

import java.io.IOException;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchClient elasticsearchClient() throws IOException {
        // RestClient 생성 (Elasticsearch 서버와의 연결을 담당)
        RestClient restClient = RestClient.builder(
                new HttpHost("localhost", 9200, "http") // Elasticsearch 서버 주소
        ).build();

        // RestClientTransport를 사용하여 ElasticsearchTransport 생성
        ElasticsearchTransport transport = new RestClientTransport(
                restClient,
                new JacksonJsonpMapper() // JSON 직렬화/역직렬화 위해 JacksonJsonpMapper 사용
        );

        // ElasticsearchClient 생성
        return new ElasticsearchClient(transport);
    }
}
