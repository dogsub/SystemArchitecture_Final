package gcu.backend.dreank.domain.mapping;

import com.fasterxml.jackson.annotation.JsonBackReference;
import gcu.backend.dreank.domain.chat.Chatting;
import gcu.backend.dreank.domain.common.BaseEntity;
import gcu.backend.dreank.domain.study.Study;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatRoom extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Chatting> chattingList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "study_id")
    private Study study;
}
